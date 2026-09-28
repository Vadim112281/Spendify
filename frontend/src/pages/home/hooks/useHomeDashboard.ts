import {useCallback, useMemo, useState} from "react";
import {
	getWalletDisplayName,
	WALLET_TYPE_LABELS,
} from "@/features/wallets/walletDisplay";
import type {Wallet} from "@/features/wallets/walletTypes";
import type {
	HomeDashboardWallet,
	HomeMonthSummary,
} from "@/pages/home/types/homeDashboardTypes";

const EMPTY_MONTH_SUMMARY: HomeMonthSummary = {spent: 0, income: 0};

const toDashboardWallet = (wallet: Wallet): HomeDashboardWallet => {
	return {
		walletId: wallet.walletId,
		name: getWalletDisplayName(wallet.walletName, wallet.walletType),
		walletTypeLabel: WALLET_TYPE_LABELS[wallet.walletType],
		currency: wallet.currencyType,
		balance: 0,
	};
};

export const useHomeDashboard = (wallets: Wallet[]) => {
	const [activeWalletId, setActiveWalletId] = useState<string | undefined>();

	const dashboardWallets = useMemo(
		() => wallets.map(toDashboardWallet),
		[wallets],
	);

	const wallet = useMemo(() => {
		if (activeWalletId) {
			const selectedWallet = dashboardWallets.find(
				(item) => item.walletId === activeWalletId,
			);
			if (selectedWallet) {
				return selectedWallet;
			}
		}

		return dashboardWallets[0];
	}, [activeWalletId, dashboardWallets]);

	const selectWallet = useCallback((walletId: string) => {
		setActiveWalletId(walletId);
	}, []);

	return {
		wallet,
		wallets: dashboardWallets,
		selectWallet,
		monthSummary: EMPTY_MONTH_SUMMARY,
		transactions: [],
	};
};
