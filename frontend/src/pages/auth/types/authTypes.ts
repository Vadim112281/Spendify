import type {LoginErrorCode, RegisterErrorCode} from "@/pages/auth/types/authErrorCodes";

export type LoginFormValues = {
	email: string;
	password: string;
};

export type LoginFieldErrorCodes = Partial<
	Record<keyof LoginFormValues, LoginErrorCode>
>;

export type LoginFieldErrors = Partial<Record<keyof LoginFormValues, string>>;

export type RegisterFormValues = {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	passwordConfirm: string;
};

export type RegisterFieldErrorCodes = Partial<
	Record<keyof RegisterFormValues, RegisterErrorCode>
>;

export type RegisterFieldErrors = Partial<
	Record<keyof RegisterFormValues, string>
>;
