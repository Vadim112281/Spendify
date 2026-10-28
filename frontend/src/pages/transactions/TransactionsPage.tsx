import {useCallback, useMemo, useState} from "react";
import {APP_ROUTES} from "@/app/navigation/routes";
import {TransactionsInsightsCard} from "@/features/transactions/components/insights/TransactionsInsightsCard";
import {MonthTransactionsEmptyState} from "@/features/transactions/components/MonthTransactionsEmptyState";
import {TransactionsTypeFilter} from "@/features/transactions/components/TransactionsTypeFilter";
import {filterTransactionsInCalendarMonth} from "@/features/transactions/services/transactionCalendarMonthService";
import {
	buildTransactionInsights,
	filterTransactionsByView,
} from "@/features/transactions/services/transactionInsightsService";
import {useWalletTransactionsQuery} from "@/features/transactions/transactionsQuery";
import {
	TRANSACTIONS_VIEW_FILTER,
	type TransactionsViewFilter,
} from "@/features/transactions/types/transactionsViewFilter";
import {WalletEmpty} from "@/features/wallets/components/WalletEmpty";
import {WalletLoadError} from "@/features/wallets/components/WalletLoadError";
import {WalletLoading} from "@/features/wallets/components/WalletLoading";
import {useActiveWalletId} from "@/features/wallets/hooks/useActiveWalletId";
import {useUserWallets} from "@/features/wallets/hooks/useUserWallets";
import {useWalletEmptyCreateAction} from "@/features/wallets/hooks/useWalletEmptyCreateAction";
import {CURRENCY_TYPE_DISPLAY} from "@/features/wallets/walletDisplayService";
import {TransactionsMonthList} from "@/pages/transactions/components/TransactionsMonthList";
import {useTransactionsPageFocus} from "@/pages/transactions/hooks/useTransactionsPageFocus";
import {AppButton} from "@/shared/ui/AppButton/AppButton";
import {AppMonthPageHeader} from "@/shared/ui/AppMonthPageHeader/AppMonthPageHeader";
import {formatLongMonth} from "@/shared/utils/timeUtils";
import {twx} from "@/shared/utils/twx";

const TRANSACTIONS_LOAD_ERROR_MESSAGE =
	"Could not load transactions. Please try again.";

const ACTIVE_WALLET_MISMATCH_MESSAGE =
	"Could not match your wallet. Please try again.";

export const TransactionsPage = () => {
	const monthLabel = formatLongMonth();
	const [viewFilter, setViewFilter] = useState<TransactionsViewFilter>(
		TRANSACTIONS_VIEW_FILTER.ALL,
	);
	const {wallets, isLoading, error, hasWallet, refetch} = useUserWallets();
	const {activeWallet, activeWalletId} = useActiveWalletId(wallets);
	const {
		transactions,
		isLoading: transactionsLoading,
		isError: transactionsError,
		refetch: refetchTransactions,
	} = useWalletTransactionsQuery(activeWalletId);

	const monthTransactions = useMemo(
		() => filterTransactionsInCalendarMonth(transactions),
		[transactions],
	);

	const filteredTransactions = useMemo(
		() => filterTransactionsByView(monthTransactions, viewFilter),
		[monthTransactions, viewFilter],
	);

	const insights = useMemo(
		() => buildTransactionInsights(monthTransactions, viewFilter),
		[monthTransactions, viewFilter],
	);

	const currencySymbol = activeWallet
		? CURRENCY_TYPE_DISPLAY[activeWallet.currencyType].symbol
		: "";

	const listReady =
		!transactionsLoading && !transactionsError && monthTransactions.length > 0;

	const handleFocusNavigate = useCallback(() => {
		setViewFilter(TRANSACTIONS_VIEW_FILTER.ALL);
	}, []);

	const {pulsingTransactionId} = useTransactionsPageFocus({
		listReady,
		filteredTransactions,
		onFocusReceived: handleFocusNavigate,
	});

	const handleCreateWallet = useWalletEmptyCreateAction(
		APP_ROUTES.APP_TRANSACTIONS,
	);

	const centeredPageClassName =
		"flex min-h-app-page w-full items-center justify-center";

	if (isLoading) {
		return (
			<div className={centeredPageClassName}>
				<WalletLoading />
			</div>
		);
	}

	if (error) {
		return (
			<div className={centeredPageClassName}>
				<WalletLoadError
					message={error}
					onRetry={() => {
						void refetch();
					}}
				/>
			</div>
		);
	}

	if (!hasWallet) {
		return (
			<div className={centeredPageClassName}>
				<WalletEmpty onCreateWallet={handleCreateWallet} />
			</div>
		);
	}

	if (!activeWallet) {
		return (
			<div className={centeredPageClassName}>
				<WalletLoadError
					message={ACTIVE_WALLET_MISMATCH_MESSAGE}
					onRetry={() => {
						void refetch();
					}}
				/>
			</div>
		);
	}

	const retryTransactions = () => {
		void refetchTransactions();
	};

	return (
		<div className="flex h-full min-h-0 flex-col overflow-hidden">
			<div className="shrink-0">
				<AppMonthPageHeader label="Transactions" title={monthLabel} />
			</div>

			{transactionsLoading ? (
				<div className="mt-20 min-h-0 flex-1 overflow-y-auto pb-tab-bar-layout">
					<WalletLoading label="Loading transactions..." />
				</div>
			) : transactionsError ? (
				<div className="mt-20 min-h-0 flex-1 overflow-y-auto pb-tab-bar-layout">
					<p className="m-0 text-14 leading-relaxed text-e-zinc/85">
						{TRANSACTIONS_LOAD_ERROR_MESSAGE}
					</p>
					<AppButton
						type="button"
						className="mt-16"
						onClick={retryTransactions}
					>
						Try again
					</AppButton>
				</div>
			) : monthTransactions.length === 0 ? (
				<div className="mt-20 min-h-0 flex-1 overflow-y-auto pb-tab-bar-layout">
					<MonthTransactionsEmptyState />
				</div>
			) : (
				<>
					<div className="mt-20 flex shrink-0 flex-col gap-20">
						<TransactionsTypeFilter
							value={viewFilter}
							onChange={setViewFilter}
						/>
						<TransactionsInsightsCard
							insights={insights}
							currencySymbol={currencySymbol}
						/>
					</div>
					<div
						className={twx(
							"mt-20 min-h-0 flex-1 overflow-x-hidden overflow-y-auto pb-tab-bar-layout",
							"scrollbar-hidden overscroll-y-contain touch-pan-y",
						)}
					>
						<TransactionsMonthList
							wallet={activeWallet}
							transactions={filteredTransactions}
							focusTransactionId={pulsingTransactionId}
						/>
					</div>
				</>
			)}
		</div>
	);
};
