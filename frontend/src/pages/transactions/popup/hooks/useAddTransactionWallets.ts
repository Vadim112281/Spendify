import {useCallback, useEffect, useState} from "react";

import {getUserWallets} from "@/features/wallets/api/walletsApi";
import type {Wallet} from "@/features/wallets/walletTypes";
import {mapLoadWalletsError} from "@/features/wallets/walletLoadMessages";

export const useAddTransactionWallets = (enabled: boolean) => {
	const [wallets, setWallets] = useState<Wallet[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | undefined>();

	const load = useCallback(async () => {
		setIsLoading(true);
		setError(undefined);

		try {
			const items = await getUserWallets();
			setWallets(items);
		} catch (loadError) {
			setError(mapLoadWalletsError(loadError));
			setWallets([]);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		if (!enabled) {
			return;
		}

		void load();
	}, [enabled, load]);

	return {wallets, isLoading, error};
};
