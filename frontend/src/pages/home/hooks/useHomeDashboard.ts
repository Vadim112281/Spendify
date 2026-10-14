import {useCallback, useMemo, useState} from "react";
import {useWalletTransactionsQuery} from "@/features/transactions/transactionsQuery";
import {
	WALLET_TYPE_LABELS,
	walletDisplayService,
} from "@/features/wallets/walletDisplayService";
import type {Wallet} from "@/features/wallets/walletTypes";
import {mapHomeDashboardTransaction} from "@/pages/home/services/homeDashboardTransactionsService";
import {calculateHomeWalletStats} from "@/pages/home/services/homeWalletStatsService";
import type {HomeDashboardWallet} from "@/pages/home/types/homeDashboardTypes";

const toDashboardWallet = (wallet: Wallet): HomeDashboardWallet => {
	return {
		walletId: wallet.walletId,
		name: walletDisplayService.getWalletDisplayName(
			wallet.walletName,
			wallet.walletType,
		),
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

	const baseWallet = useMemo(() => {
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

	const {
		transactions: walletTransactions,
		isLoading: transactionsLoading,
		isFetching: transactionsFetching,
		isError: transactionsError,
		refetch: refetchTransactions,
	} = useWalletTransactionsQuery(baseWallet?.walletId);

	const transactionsBusy =
		transactionsLoading || (transactionsFetching && transactionsError);

	const transactions = useMemo(
		() => walletTransactions.map(mapHomeDashboardTransaction),
		[walletTransactions],
	);

	const {balance, monthSummary} = useMemo(
		() => calculateHomeWalletStats(transactions),
		[transactions],
	);

	const wallet = useMemo(() => {
		if (!baseWallet) {
			return baseWallet;
		}

		return {
			...baseWallet,
			balance,
		};
	}, [baseWallet, balance]);

	const selectWallet = useCallback((walletId: string) => {
		setActiveWalletId(walletId);
	}, []);

	return {
		wallet,
		wallets: dashboardWallets,
		selectWallet,
		monthSummary,
		transactions,
		transactionsLoading: transactionsBusy,
		transactionsError,
		refetchTransactions,
	};
};
