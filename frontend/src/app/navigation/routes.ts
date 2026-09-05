export const APP_ROUTES = {
	ENTRY: "/",
	DEV_TOOLS: "/dev",
} as const;

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
