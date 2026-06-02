export const APP_ROUTES = {
	ENTRY: "/",
	AUTH: "/auth",
	AUTH_REGISTER: "/auth/register",
	DASHBOARD: "/dashboard",
} as const;

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
