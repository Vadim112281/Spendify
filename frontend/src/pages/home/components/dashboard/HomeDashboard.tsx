import type {Wallet} from "@/features/wallets/walletTypes";
import {HomeBalanceCard} from "@/pages/home/components/dashboard/balance/HomeBalanceCard";
import {HomeDashboardHeader} from "@/pages/home/components/dashboard/header/HomeDashboardHeader";
import {HomeMonthFlow} from "@/pages/home/components/dashboard/monthFlow/HomeMonthFlow";
import {HomeTransactionsPreview} from "@/pages/home/components/dashboard/transactions/HomeTransactionsPreview";
import {useHomeDashboard} from "@/pages/home/hooks/useHomeDashboard";
import {formatLongMonth} from "@/shared/utils/timeUtils";
import {twx} from "@/shared/utils/twx";

type HomeDashboardProps = {
	wallets: Wallet[];
};

export const HomeDashboard = ({wallets}: HomeDashboardProps) => {
	const monthLabel = formatLongMonth();
	const {
		wallet,
		wallets: dashboardWallets,
		selectWallet,
		monthSummary,
		transactions,
		transactionsLoading,
		transactionsError,
		refetchTransactions,
	} = useHomeDashboard(wallets);

	const retryTransactions = () => {
		void refetchTransactions();
	};

	if (!wallet) {
		return null;
	}

	const isStatsError = transactionsError && !transactionsLoading;

	return (
		<div className="flex h-full min-h-0 flex-col overflow-hidden">
			<div className="flex shrink-0 flex-col gap-20">
				<HomeDashboardHeader
					monthLabel={monthLabel}
					wallets={dashboardWallets}
					activeWallet={wallet}
					onSelectWallet={selectWallet}
				/>
				<div className="flex flex-col gap-10">
					<HomeBalanceCard
						wallet={wallet}
						isStatsLoading={transactionsLoading}
						isStatsError={isStatsError}
						onStatsRetry={retryTransactions}
					/>
					<HomeMonthFlow
						summary={monthSummary}
						currency={wallet.currency}
						isStatsLoading={transactionsLoading}
						isStatsError={isStatsError}
						onStatsRetry={retryTransactions}
					/>
				</div>
			</div>

			<div className="mt-20 flex min-h-0 flex-1 flex-col overflow-hidden">
				<h2
					id="home-transactions-preview-heading"
					className="m-0 mb-10 shrink-0 text-17 font-semibold tracking-tight-03 text-e-heading"
				>
					Recent
				</h2>
				<div
					className={twx(
						"min-h-0 flex-1 overflow-x-hidden overflow-y-auto",
						"scrollbar-hidden overscroll-y-contain touch-pan-y",
					)}
				>
					<div className="pb-tab-bar-layout">
						<HomeTransactionsPreview
							transactions={transactions}
							currency={wallet.currency}
							isLoading={transactionsLoading}
							isError={transactionsError}
							onRetry={retryTransactions}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
