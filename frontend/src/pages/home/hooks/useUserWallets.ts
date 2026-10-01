import {useCallback, useEffect, useState} from "react";
import {getUserWallets} from "@/features/wallets/api/walletsApi";
import type {Wallet} from "@/features/wallets/walletTypes";
import {mapLoadWalletsError} from "@/pages/home/services/walletLoadMessagesService";

export const useUserWallets = () => {
	const [wallets, setWallets] = useState<Wallet[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | undefined>();

	const fetchWallets = useCallback(async (showLoading: boolean) => {
		if (showLoading) {
			setIsLoading(true);
			setError(undefined);
		}

		try {
			const userWallets = await getUserWallets();
			setWallets(userWallets);
			setError(undefined);
		} catch (loadError) {
			setError(mapLoadWalletsError(loadError));
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		void fetchWallets(true);
	}, [fetchWallets]);

	const refetch = useCallback(async () => {
		await fetchWallets(true);
	}, [fetchWallets]);

	return {
		wallets,
		isLoading,
		error,
		hasWallet: wallets.length > 0,
		refetch,
	};
};
