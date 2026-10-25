import {useCallback, useMemo, useState} from "react";
import type {Wallet} from "@/features/wallets/walletTypes";
import {
	getActiveWalletId,
	storeActiveWalletId,
} from "@/shared/services/storage/appStorage";

const resolveActiveWalletId = (
	wallets: Wallet[],
	storedWalletId: string | null,
): string | undefined => {
	if (wallets.length === 0) {
		return undefined;
	}

	if (
		storedWalletId &&
		wallets.some((wallet) => wallet.walletId === storedWalletId)
	) {
		return storedWalletId;
	}

	return wallets[0].walletId;
};

export const useActiveWalletId = (wallets: Wallet[]) => {
	const [storedWalletId, setStoredWalletId] = useState<string | null>(() =>
		getActiveWalletId(),
	);

	const activeWalletId = useMemo(
		() => resolveActiveWalletId(wallets, storedWalletId),
		[wallets, storedWalletId],
	);

	const activeWallet = useMemo(
		() => wallets.find((wallet) => wallet.walletId === activeWalletId),
		[wallets, activeWalletId],
	);

	const setActiveWalletId = useCallback(
		(walletId: string) => {
			if (!wallets.some((wallet) => wallet.walletId === walletId)) {
				return;
			}

			storeActiveWalletId(walletId);
			setStoredWalletId(walletId);
		},
		[wallets],
	);

	return {
		activeWalletId,
		activeWallet,
		setActiveWalletId,
	};
};
