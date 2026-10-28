import type {Navigation} from "@/app/navigation/navigation";
import {APP_ROUTES, type AppRoute} from "@/app/navigation/routes";
import {SLIDE_INTENT} from "@/app/navigation/types/slideIntentTypes";

type NavigateWalletCreateReturnOptions = {
	replace?: boolean;
};

export const navigateWalletCreateReturn = (
	navigation: Navigation,
	returnPath: AppRoute,
	options?: NavigateWalletCreateReturnOptions,
) => {
	const navOptions = {
		slide: SLIDE_INTENT.BACK,
		...(options?.replace === true ? {replace: true} : {}),
	};

	if (returnPath === APP_ROUTES.APP_TRANSACTIONS) {
		navigation.goToTransactionsPage(navOptions);
		return;
	}

	navigation.goToHomePage(navOptions);
};
