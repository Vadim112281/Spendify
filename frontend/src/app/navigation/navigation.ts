// Single registry of all goTo* actions.
// createNavigation(handlers) binds runtime implementations:
//   auth  — in-page screens (useScreenTransition on AuthPage)
//   route — URL paths (react-router navigate, when connected)

import {AUTH_SCREEN, type AuthScreen} from "@/pages/auth/types/authScreen";

import {APP_ROUTES, type AppRoute} from "./routes";
import type {RouteNavigateOptions} from "./types/slideIntentTypes";

export type NavigationHandlers = {
	auth?: (screen: AuthScreen) => void;
	route?: (path: AppRoute, options?: RouteNavigateOptions) => void;
};

export const createNavigation = ({auth, route}: NavigationHandlers) => ({
	goToAuthScreen: (screen: AuthScreen) => auth?.(screen),

	// Auth — in-page tabs
	goToLoginPage: () => auth?.(AUTH_SCREEN.LOGIN),
	goToRegisterPage: () => auth?.(AUTH_SCREEN.REGISTER),

	// App — URL routes (need handlers.route)
	goToEntryPage: () => route?.(APP_ROUTES.ENTRY),
	goToDevToolsPage: () => route?.(APP_ROUTES.DEV_TOOLS),
	goToHomePage: (options?: RouteNavigateOptions) =>
		route?.(APP_ROUTES.APP_HOME, options),
	goToOperationsPage: (options?: RouteNavigateOptions) =>
		route?.(APP_ROUTES.APP_OPERATIONS, options),
	goToAnalyticsPage: (options?: RouteNavigateOptions) =>
		route?.(APP_ROUTES.APP_ANALYTICS, options),
	goToProfilePage: (options?: RouteNavigateOptions) =>
		route?.(APP_ROUTES.APP_PROFILE, options),
});

export type Navigation = ReturnType<typeof createNavigation>;
