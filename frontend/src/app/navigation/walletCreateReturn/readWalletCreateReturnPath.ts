import {APP_ROUTES, type AppRoute} from "@/app/navigation/routes";
import type {RouteLocationState} from "@/app/navigation/types/slideIntentTypes";

const WALLET_CREATE_RETURN_PATHS: AppRoute[] = [
	APP_ROUTES.APP_HOME,
	APP_ROUTES.APP_TRANSACTIONS,
];

// Create-wallet return contract: callers pass walletCreateReturnPath on goToCreateWalletPage.
// CreateWalletPage Back and successful submit both navigate to the resolved path (default Home).

export const readWalletCreateReturnPath = (state: unknown): AppRoute => {
	const returnPath = (state as RouteLocationState | null)
		?.walletCreateReturnPath;

	if (
		returnPath != null &&
		WALLET_CREATE_RETURN_PATHS.includes(returnPath as AppRoute)
	) {
		return returnPath as AppRoute;
	}

	return APP_ROUTES.APP_HOME;
};
