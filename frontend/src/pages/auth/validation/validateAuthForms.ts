import {
	LOGIN_ERROR_CODE,
	type LoginErrorCode,
	REGISTER_ERROR_CODE,
	type RegisterErrorCode,
} from "@/pages/auth/types/authErrorCodes";
import type {
	LoginFieldErrorCodes,
	LoginFormValues,
	RegisterFieldErrorCodes,
	RegisterFormValues,
} from "@/pages/auth/types/authTypes";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_MAX_LENGTH = 256;
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 50;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;

const LOGIN_EMAIL_CODES = {
	required: LOGIN_ERROR_CODE.EMAIL_REQUIRED,
	invalid: LOGIN_ERROR_CODE.INVALID_EMAIL,
	tooLong: LOGIN_ERROR_CODE.EMAIL_TOO_LONG,
};

const REGISTER_EMAIL_CODES = {
	required: REGISTER_ERROR_CODE.EMAIL_REQUIRED,
	invalid: REGISTER_ERROR_CODE.INVALID_EMAIL,
	tooLong: REGISTER_ERROR_CODE.EMAIL_TOO_LONG,
};

const FIRST_NAME_CODES = {
	required: REGISTER_ERROR_CODE.FIRST_NAME_REQUIRED,
	tooShort: REGISTER_ERROR_CODE.FIRST_NAME_TOO_SHORT,
	tooLong: REGISTER_ERROR_CODE.FIRST_NAME_TOO_LONG,
};

const LAST_NAME_CODES = {
	required: REGISTER_ERROR_CODE.LAST_NAME_REQUIRED,
	tooShort: REGISTER_ERROR_CODE.LAST_NAME_TOO_SHORT,
	tooLong: REGISTER_ERROR_CODE.LAST_NAME_TOO_LONG,
};

const getEmailErrorCode = <T extends string>(
	email: string,
	codes: {required: T; invalid: T; tooLong: T},
): T | undefined => {
	const trimmed = email.trim();

	if (!trimmed) {
		return codes.required;
	}

	if (!EMAIL_PATTERN.test(trimmed)) {
		return codes.invalid;
	}

	if (trimmed.length > EMAIL_MAX_LENGTH) {
		return codes.tooLong;
	}
};

const getPasswordErrorCode = <T extends string>(
	password: string,
	codes: {required: T; tooLong: T},
): T | undefined => {
	const trimmed = password.trim();

	if (!trimmed) {
		return codes.required;
	}

	if (trimmed.length > PASSWORD_MAX_LENGTH) {
		return codes.tooLong;
	}
};

const getLoginPasswordErrorCode = (
	password: string,
): LoginErrorCode | undefined =>
	getPasswordErrorCode(password, {
		required: LOGIN_ERROR_CODE.PASSWORD_REQUIRED,
		tooLong: LOGIN_ERROR_CODE.PASSWORD_TOO_LONG,
	});

const getRegisterPasswordErrorCode = (
	password: string,
): RegisterErrorCode | undefined => {
	const trimmed = password.trim();

	if (!trimmed) {
		return REGISTER_ERROR_CODE.PASSWORD_REQUIRED;
	}

	if (trimmed.length < PASSWORD_MIN_LENGTH) {
		return REGISTER_ERROR_CODE.PASSWORD_TOO_SHORT;
	}

	if (trimmed.length > PASSWORD_MAX_LENGTH) {
		return REGISTER_ERROR_CODE.PASSWORD_TOO_LONG;
	}

	if (!/\d/.test(trimmed)) {
		return REGISTER_ERROR_CODE.PASSWORD_REQUIRES_DIGIT;
	}

	if (!/[a-z]/.test(trimmed)) {
		return REGISTER_ERROR_CODE.PASSWORD_REQUIRES_LOWERCASE;
	}

	if (!/[A-Z]/.test(trimmed)) {
		return REGISTER_ERROR_CODE.PASSWORD_REQUIRES_UPPERCASE;
	}
};

const getNameErrorCode = (
	value: string,
	codes: {
		required: RegisterErrorCode;
		tooShort: RegisterErrorCode;
		tooLong: RegisterErrorCode;
	},
): RegisterErrorCode | undefined => {
	const trimmed = value.trim();

	if (!trimmed) {
		return codes.required;
	}

	if (trimmed.length < NAME_MIN_LENGTH) {
		return codes.tooShort;
	}

	if (trimmed.length > NAME_MAX_LENGTH) {
		return codes.tooLong;
	}
};

const getPasswordConfirmErrorCode = (
	password: string,
	passwordConfirm: string,
): RegisterErrorCode | undefined => {
	const trimmedPassword = password.trim();
	const trimmedConfirm = passwordConfirm.trim();

	if (!trimmedConfirm) {
		return REGISTER_ERROR_CODE.PASSWORD_CONFIRM_REQUIRED;
	}

	if (trimmedPassword !== trimmedConfirm) {
		return REGISTER_ERROR_CODE.PASSWORD_CONFIRM_MISMATCH;
	}
};

const toFieldErrorCodes = <T extends string>(
	codes: Record<string, T | undefined>,
): Partial<Record<string, T>> | null => {
	const errors: Partial<Record<string, T>> = {};

	for (const field in codes) {
		const code = codes[field];
		if (code) {
			errors[field] = code;
		}
	}

	return Object.keys(errors).length > 0 ? errors : null;
};

export const validateLoginForm = (
	values: LoginFormValues,
): LoginFieldErrorCodes | null => {
	const emailCode = getEmailErrorCode(values.email, LOGIN_EMAIL_CODES);
	const passwordCode = getLoginPasswordErrorCode(values.password);

	return toFieldErrorCodes({
		email: emailCode,
		password: passwordCode,
	});
};

export const validateRegisterForm = (
	values: RegisterFormValues,
): RegisterFieldErrorCodes | null => {
	const emailCode = getEmailErrorCode(values.email, REGISTER_EMAIL_CODES);
	const firstNameCode = getNameErrorCode(values.firstName, FIRST_NAME_CODES);
	const lastNameCode = getNameErrorCode(values.lastName, LAST_NAME_CODES);
	const passwordCode = getRegisterPasswordErrorCode(values.password);
	const passwordConfirmCode = getPasswordConfirmErrorCode(
		values.password,
		values.passwordConfirm,
	);

	return toFieldErrorCodes({
		email: emailCode,
		firstName: firstNameCode,
		lastName: lastNameCode,
		password: passwordCode,
		passwordConfirm: passwordConfirmCode,
	});
};
