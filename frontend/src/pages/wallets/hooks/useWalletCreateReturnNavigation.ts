import {useCallback} from "react";
import {useLocation} from "react-router-dom";
import {useRouteNavigation} from "@/app/navigation/useRouteNavigation";
import {navigateWalletCreateReturn} from "@/app/navigation/walletCreateReturn/navigateWalletCreateReturn";
import {readWalletCreateReturnPath} from "@/app/navigation/walletCreateReturn/readWalletCreateReturnPath";
import type {Wallet} from "@/features/wallets/walletTypes";
import {storeActiveWalletId} from "@/shared/services/storage/appStorage";

export const useWalletCreateReturnNavigation = () => {
	const location = useLocation();
	const navigation = useRouteNavigation();
	const returnPath = readWalletCreateReturnPath(location.state);

	const goToReturn = useCallback(
		(options?: {replace?: boolean}) => {
			navigateWalletCreateReturn(navigation, returnPath, options);
		},
		[navigation, returnPath],
	);

	const completeAfterWalletCreate = useCallback(
		(wallet: Wallet) => {
			storeActiveWalletId(wallet.walletId);
			navigateWalletCreateReturn(navigation, returnPath, {replace: true});
		},
		[navigation, returnPath],
	);

	return {returnPath, goToReturn, completeAfterWalletCreate};
};
