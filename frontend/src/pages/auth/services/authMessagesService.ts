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

const UNKNOWN_ERROR_MESSAGE = "Something went wrong. Please try again";

const LOGIN_FORM_FIELDS: (keyof LoginFormValues)[] = ["email", "password"];

const REGISTER_FORM_FIELDS: (keyof RegisterFormValues)[] = [
	"email",
	"firstName",
	"lastName",
	"password",
	"passwordConfirm",
];

const LOGIN_MESSAGES: Record<LoginErrorCode, string> = {
	[LOGIN_ERROR_CODE.EMAIL_REQUIRED]: "Enter email",
	[LOGIN_ERROR_CODE.INVALID_EMAIL]: "Invalid email format",
	[LOGIN_ERROR_CODE.EMAIL_TOO_LONG]: "Email is too long",
	[LOGIN_ERROR_CODE.PASSWORD_REQUIRED]: "Enter password",
	[LOGIN_ERROR_CODE.PASSWORD_TOO_LONG]: "Maximum 128 characters",
	[LOGIN_ERROR_CODE.INVALID_CREDENTIALS]: "Invalid email or password",
};

const REGISTER_MESSAGES: Record<RegisterErrorCode, string> = {
	[REGISTER_ERROR_CODE.EMAIL_REQUIRED]: "Enter email",
	[REGISTER_ERROR_CODE.INVALID_EMAIL]: "Invalid email format",
	[REGISTER_ERROR_CODE.EMAIL_TOO_LONG]: "Email is too long",
	[REGISTER_ERROR_CODE.EMAIL_ALREADY_EXISTS]: "This email is already registered",
	[REGISTER_ERROR_CODE.PASSWORD_REQUIRED]: "Enter password",
	[REGISTER_ERROR_CODE.PASSWORD_TOO_SHORT]: "Minimum 8 characters",
	[REGISTER_ERROR_CODE.PASSWORD_TOO_LONG]: "Maximum 128 characters",
	[REGISTER_ERROR_CODE.PASSWORD_REQUIRES_DIGIT]: "Add at least one digit",
	[REGISTER_ERROR_CODE.PASSWORD_REQUIRES_LOWERCASE]:
		"Add at least one lowercase letter",
	[REGISTER_ERROR_CODE.PASSWORD_REQUIRES_UPPERCASE]:
		"Add at least one uppercase letter",
	[REGISTER_ERROR_CODE.FIRST_NAME_REQUIRED]: "Enter first name",
	[REGISTER_ERROR_CODE.FIRST_NAME_TOO_SHORT]: "Minimum 2 characters",
	[REGISTER_ERROR_CODE.FIRST_NAME_TOO_LONG]: "Maximum 50 characters",
	[REGISTER_ERROR_CODE.LAST_NAME_REQUIRED]: "Enter last name",
	[REGISTER_ERROR_CODE.LAST_NAME_TOO_SHORT]: "Minimum 2 characters",
	[REGISTER_ERROR_CODE.LAST_NAME_TOO_LONG]: "Maximum 50 characters",
	[REGISTER_ERROR_CODE.PASSWORD_CONFIRM_REQUIRED]: "Confirm password",
	[REGISTER_ERROR_CODE.PASSWORD_CONFIRM_MISMATCH]: "Passwords do not match",
	[REGISTER_ERROR_CODE.REGISTRATION_FAILED]: "Could not create account",
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
