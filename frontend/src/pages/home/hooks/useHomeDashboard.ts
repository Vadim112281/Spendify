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
		// Wallet API has no balance; active wallet gets it below.
		balance: 0,
	};
};

export const useHomeDashboard = (wallets: Wallet[]) => {
	const [activeWalletId, setActiveWalletId] = useState<string | undefined>();

	const dashboardWallets = useMemo(
		() => wallets.map(toDashboardWallet),
		[wallets],
	);

	const activeDashboardWallet = useMemo(() => {
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
	} = useWalletTransactionsQuery(activeDashboardWallet?.walletId);

	const showTransactionsLoading =
		transactionsLoading || (transactionsFetching && transactionsError);

	const transactions = useMemo(
		() => walletTransactions.map(mapHomeDashboardTransaction),
		[walletTransactions],
	);

	// Sum on the client for now; move to the API later.
	const {balance, monthSummary} = useMemo(
		() => calculateHomeWalletStats(transactions),
		[transactions],
	);

	// Raw Wallet from API for the selected dashboard wallet.
	const sourceWallet = useMemo(() => {
		if (!activeDashboardWallet) {
			return undefined;
		}

		return wallets.find((item) => item.walletId === activeDashboardWallet.walletId);
	}, [activeDashboardWallet, wallets]);

	// HomeDashboardWallet plus balance for header, cards, and stats.
	const activeWallet = useMemo(() => {
		if (!activeDashboardWallet || !sourceWallet) {
			return undefined;
		}

		return {
			...activeDashboardWallet,
			balance,
		};
	}, [activeDashboardWallet, sourceWallet, balance]);

	const selectWallet = useCallback((walletId: string) => {
		setActiveWalletId(walletId);
	}, []);

	return {
		activeWallet,
		sourceWallet: activeWallet ? sourceWallet : undefined,
		wallets: dashboardWallets,
		selectWallet,
		monthSummary,
		transactions,
		transactionsLoading: showTransactionsLoading,
		transactionsError,
		refetchTransactions,
	};
};
