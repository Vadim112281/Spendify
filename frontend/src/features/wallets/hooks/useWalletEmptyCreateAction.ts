import {useCallback} from "react";

import type {AppRoute} from "@/app/navigation/routes";
import {useRouteNavigation} from "@/app/navigation/useRouteNavigation";

// Create-wallet navigation with return path (WalletEmpty, wallet switcher "Add", etc.).

export const useWalletEmptyCreateAction = (returnPath: AppRoute) => {
	const navigation = useRouteNavigation();

	return useCallback(() => {
		navigation.goToCreateWalletPage({walletCreateReturnPath: returnPath});
	}, [navigation, returnPath]);
};
