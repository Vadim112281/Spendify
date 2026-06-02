export const AUTH_SCREEN = {
	LOGIN: "login",
	REGISTER: "register",
} as const;

export type AuthScreen = (typeof AUTH_SCREEN)[keyof typeof AUTH_SCREEN];
