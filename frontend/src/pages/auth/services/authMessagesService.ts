import {
	LOGIN_ERROR_CODE,
	type LoginErrorCode,
	REGISTER_ERROR_CODE,
	type RegisterErrorCode,
} from "@/pages/auth/types/authErrorCodes";
import type {
	LoginFieldErrorCodes,
	LoginFieldErrors,
	LoginFormValues,
	RegisterFieldErrorCodes,
	RegisterFieldErrors,
	RegisterFormValues,
} from "@/pages/auth/types/authTypes";

const UNKNOWN_ERROR_MESSAGE = "Щось пішло не так. Спробуйте ще раз";

const LOGIN_FORM_FIELDS: (keyof LoginFormValues)[] = ["email", "password"];

const REGISTER_FORM_FIELDS: (keyof RegisterFormValues)[] = [
	"email",
	"firstName",
	"lastName",
	"password",
	"passwordConfirm",
];

const LOGIN_MESSAGES: Record<LoginErrorCode, string> = {
	[LOGIN_ERROR_CODE.EMAIL_REQUIRED]: "Введіть email",
	[LOGIN_ERROR_CODE.INVALID_EMAIL]: "Невірний формат email",
	[LOGIN_ERROR_CODE.EMAIL_TOO_LONG]: "Занадто довгий email",
	[LOGIN_ERROR_CODE.PASSWORD_REQUIRED]: "Введіть пароль",
	[LOGIN_ERROR_CODE.PASSWORD_TOO_LONG]: "Максимум 128 символів",
	[LOGIN_ERROR_CODE.INVALID_CREDENTIALS]: "Невірний email або пароль",
};

const REGISTER_MESSAGES: Record<RegisterErrorCode, string> = {
	[REGISTER_ERROR_CODE.EMAIL_REQUIRED]: "Введіть email",
	[REGISTER_ERROR_CODE.INVALID_EMAIL]: "Невірний формат email",
	[REGISTER_ERROR_CODE.EMAIL_TOO_LONG]: "Занадто довгий email",
	[REGISTER_ERROR_CODE.EMAIL_ALREADY_EXISTS]: "Цей email вже зареєстрований",
	[REGISTER_ERROR_CODE.PASSWORD_REQUIRED]: "Введіть пароль",
	[REGISTER_ERROR_CODE.PASSWORD_TOO_SHORT]: "Мінімум 8 символів",
	[REGISTER_ERROR_CODE.PASSWORD_TOO_LONG]: "Максимум 128 символів",
	[REGISTER_ERROR_CODE.PASSWORD_REQUIRES_DIGIT]: "Додайте хоча б одну цифру",
	[REGISTER_ERROR_CODE.PASSWORD_REQUIRES_LOWERCASE]:
		"Додайте хоча б одну малу літеру",
	[REGISTER_ERROR_CODE.PASSWORD_REQUIRES_UPPERCASE]:
		"Додайте хоча б одну велику літеру",
	[REGISTER_ERROR_CODE.FIRST_NAME_REQUIRED]: "Введіть ім'я",
	[REGISTER_ERROR_CODE.FIRST_NAME_TOO_SHORT]: "Мінімум 2 символи",
	[REGISTER_ERROR_CODE.FIRST_NAME_TOO_LONG]: "Максимум 50 символів",
	[REGISTER_ERROR_CODE.LAST_NAME_REQUIRED]: "Введіть прізвище",
	[REGISTER_ERROR_CODE.LAST_NAME_TOO_SHORT]: "Мінімум 2 символи",
	[REGISTER_ERROR_CODE.LAST_NAME_TOO_LONG]: "Максимум 50 символів",
	[REGISTER_ERROR_CODE.PASSWORD_CONFIRM_REQUIRED]: "Підтвердіть пароль",
	[REGISTER_ERROR_CODE.PASSWORD_CONFIRM_MISMATCH]: "Паролі не збігаються",
	[REGISTER_ERROR_CODE.REGISTRATION_FAILED]:
		"Не вдалося створити обліковий запис",
};

export const getLoginMessage = (code: string): string =>
	LOGIN_MESSAGES[code as LoginErrorCode] ?? UNKNOWN_ERROR_MESSAGE;

export const getRegisterMessage = (code: string): string =>
	REGISTER_MESSAGES[code as RegisterErrorCode] ?? UNKNOWN_ERROR_MESSAGE;

type AuthApiError = {
	code: string;
	fieldErrors: Record<string, string>;
};

type AuthApiFormErrors<TFieldErrors> = {
	fieldErrors: TFieldErrors;
	formError?: string;
};

type LoginApiFormErrors = AuthApiFormErrors<LoginFieldErrors>;
type RegisterApiFormErrors = AuthApiFormErrors<RegisterFieldErrors>;

const mapFieldErrorCodes = <TField extends string>(
	codes: Partial<Record<TField, string>>,
	getMessage: (code: string) => string,
): Partial<Record<TField, string>> => {
	const fieldErrors: Partial<Record<TField, string>> = {};

	for (const field in codes) {
		const code = codes[field];
		if (code) {
			fieldErrors[field] = getMessage(code);
		}
	}

	return fieldErrors;
};

export const mapLoginClientErrors = (
	codes: LoginFieldErrorCodes,
): LoginFieldErrors => mapFieldErrorCodes(codes, getLoginMessage);

export const mapRegisterClientErrors = (
	codes: RegisterFieldErrorCodes,
): RegisterFieldErrors => mapFieldErrorCodes(codes, getRegisterMessage);

const mapApiFormErrors = <TField extends string>(
	error: AuthApiError,
	fields: readonly TField[],
	getMessage: (code: string) => string,
): AuthApiFormErrors<Partial<Record<TField, string>>> => {
	const fieldErrors: Partial<Record<TField, string>> = {};

	for (const field of fields) {
		const code = error.fieldErrors[field];
		if (code) {
			fieldErrors[field] = getMessage(code);
		}
	}

	const hasFieldErrors = fields.some((field) => fieldErrors[field]);

	return {
		fieldErrors,
		formError: hasFieldErrors ? undefined : getMessage(error.code),
	};
};

export const mapLoginApiError = (error: AuthApiError): LoginApiFormErrors =>
	mapApiFormErrors(error, LOGIN_FORM_FIELDS, getLoginMessage);

export const mapRegisterApiError = (
	error: AuthApiError,
): RegisterApiFormErrors =>
	mapApiFormErrors(error, REGISTER_FORM_FIELDS, getRegisterMessage);

export const getLoginUnknownError = (): LoginApiFormErrors => ({
	fieldErrors: {},
	formError: getLoginMessage("UNKNOWN_ERROR"),
});

export const getRegisterUnknownError = (): RegisterApiFormErrors => ({
	fieldErrors: {},
	formError: getRegisterMessage("UNKNOWN_ERROR"),
});
