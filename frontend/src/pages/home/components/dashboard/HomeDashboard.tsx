import {useMemo} from "react";
import {useRouteNavigation} from "@/app/navigation/useRouteNavigation";
import {filterTransactionsInCalendarMonth} from "@/features/transactions/services/transactionCalendarMonthService";
import {
	RECENT_MONTH_TRANSACTIONS_LIMIT,
	selectRecentMonthTransactions,
} from "@/features/transactions/services/transactionRecentService";
import type {Wallet} from "@/features/wallets/walletTypes";
import {HomeBalanceCard} from "@/pages/home/components/dashboard/balance/HomeBalanceCard";
import {HomeWalletSwitcher} from "@/pages/home/components/dashboard/header/HomeWalletSwitcher";
import {HomeMonthFlow} from "@/pages/home/components/dashboard/monthFlow/HomeMonthFlow";
import {HomeTransactionsPreview} from "@/pages/home/components/dashboard/transactions/HomeTransactionsPreview";
import {useHomeDashboard} from "@/pages/home/hooks/useHomeDashboard";
import {AppMonthPageHeader} from "@/shared/ui/AppMonthPageHeader/AppMonthPageHeader";
import {AppTextButton} from "@/shared/ui/AppTextButton/AppTextButton";
import {formatLongMonth} from "@/shared/utils/timeUtils";
import {twx} from "@/shared/utils/twx";

type HomeDashboardProps = {
	wallets: Wallet[];
};

export const HomeDashboard = ({wallets}: HomeDashboardProps) => {
	const navigation = useRouteNavigation();
	const monthLabel = formatLongMonth();
	const {
		activeWallet,
		sourceWallet,
		wallets: dashboardWallets,
		selectWallet,
		monthSummary,
		transactions,
		transactionsLoading,
		transactionsError,
		refetchTransactions,
	} = useHomeDashboard(wallets);

	const monthTransactions = useMemo(
		() => filterTransactionsInCalendarMonth(transactions),
		[transactions],
	);

	const recentTransactions = useMemo(
		() => selectRecentMonthTransactions(monthTransactions),
		[monthTransactions],
	);

	const retryTransactions = () => {
		void refetchTransactions();
	};

	if (!activeWallet || !sourceWallet) {
		return null;
	}

	const isStatsError = transactionsError && !transactionsLoading;
	const showSeeAll = monthTransactions.length > RECENT_MONTH_TRANSACTIONS_LIMIT;

	return (
		<div className="flex h-full min-h-0 flex-col overflow-hidden">
			<div className="flex shrink-0 flex-col gap-20">
				<AppMonthPageHeader
					label="Overview"
					title={monthLabel}
					trailing={
						<HomeWalletSwitcher
							wallets={dashboardWallets}
							activeWallet={activeWallet}
							onSelectWallet={selectWallet}
						/>
					}
				/>
				<div className="flex flex-col gap-10">
					<HomeBalanceCard
						wallet={activeWallet}
						isStatsLoading={transactionsLoading}
						isStatsError={isStatsError}
						onStatsRetry={retryTransactions}
					/>
					<HomeMonthFlow
						summary={monthSummary}
						currency={activeWallet.currency}
						isStatsLoading={transactionsLoading}
						isStatsError={isStatsError}
						onStatsRetry={retryTransactions}
					/>
				</div>
			</div>

			<div className="mt-20 flex min-h-0 flex-1 flex-col overflow-hidden">
				<div className="mb-10 flex shrink-0 items-center justify-between gap-12">
					<h2
						id="home-transactions-preview-heading"
						className="m-0 text-17 font-semibold tracking-tight-03 text-e-heading"
					>
						Recent
					</h2>
					{showSeeAll ? (
						<AppTextButton
							type="button"
							onClick={() => {
								navigation.goToTransactionsPage();
							}}
						>
							See all
						</AppTextButton>
					) : null}
				</div>
				<div
					className={twx(
						"min-h-0 flex-1 overflow-x-hidden overflow-y-auto",
						"scrollbar-hidden overscroll-y-contain touch-pan-y",
					)}
				>
					<div className="pb-tab-bar-layout">
						<HomeTransactionsPreview
							transactions={recentTransactions}
							currency={activeWallet.currency}
							isLoading={transactionsLoading}
							isError={transactionsError}
							onRetry={retryTransactions}
							onRecentRowPress={(transactionId) => {
								navigation.goToTransactionsPage({
									focusTransactionId: transactionId,
								});
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
