export const APP_ROUTE_SEGMENTS = {
	HOME: "home",
	OPERATIONS: "operations",
	ANALYTICS: "analytics",
	PROFILE: "profile",
	WALLETS_NEW: "wallets/new",
} as const;

export const APP_ROUTES = {
	ENTRY: "/",
	DEV_TOOLS: "/dev",
	APP: "/app",
	APP_HOME: `/app/${APP_ROUTE_SEGMENTS.HOME}`,
	APP_OPERATIONS: `/app/${APP_ROUTE_SEGMENTS.OPERATIONS}`,
	APP_ANALYTICS: `/app/${APP_ROUTE_SEGMENTS.ANALYTICS}`,
	APP_PROFILE: `/app/${APP_ROUTE_SEGMENTS.PROFILE}`,
	APP_CREATE_WALLET: `/app/${APP_ROUTE_SEGMENTS.WALLETS_NEW}`,
} as const;

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
