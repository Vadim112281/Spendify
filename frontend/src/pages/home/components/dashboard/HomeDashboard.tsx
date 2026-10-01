import {useState} from "react";
import type {Wallet} from "@/features/wallets/walletTypes";
import {HomeBalanceCard} from "@/pages/home/components/dashboard/balance/HomeBalanceCard";
import {HomeDashboardHeader} from "@/pages/home/components/dashboard/header/HomeDashboardHeader";
import {HomeMonthFlow} from "@/pages/home/components/dashboard/monthFlow/HomeMonthFlow";
import {HomeTransactionsPopup} from "@/pages/home/components/dashboard/transactions/HomeTransactionsPopup";
import {HomeTransactionsPreview} from "@/pages/home/components/dashboard/transactions/HomeTransactionsPreview";
import {useHomeDashboard} from "@/pages/home/hooks/useHomeDashboard";
import {formatLongMonth} from "@/shared/utils/timeUtils";

type HomeDashboardProps = {
	wallets: Wallet[];
};

export const HomeDashboard = ({wallets}: HomeDashboardProps) => {
	const [isTransactionsPopupOpen, setIsTransactionsPopupOpen] = useState(false);
	const monthLabel = formatLongMonth();
	const {wallet, wallets: dashboardWallets, selectWallet, monthSummary, transactions} =
		useHomeDashboard(wallets);

	return (
		<>
			<div className="flex h-full min-h-0 flex-col">
				<div className="flex shrink-0 flex-col gap-20">
					<HomeDashboardHeader
						monthLabel={monthLabel}
						wallets={dashboardWallets}
						activeWallet={wallet}
						onSelectWallet={selectWallet}
					/>
					<div className="flex flex-col gap-10">
						<HomeBalanceCard wallet={wallet} monthSummary={monthSummary} />
						<HomeMonthFlow summary={monthSummary} currency={wallet.currency} />
					</div>
				</div>

				<div className="flex min-h-0 flex-1 flex-col pt-22 pb-8">
					<HomeTransactionsPreview
						transactions={transactions}
						currency={wallet.currency}
						onSeeAll={() => setIsTransactionsPopupOpen(true)}
					/>
				</div>
			</div>

			<HomeTransactionsPopup
				open={isTransactionsPopupOpen}
				onClose={() => setIsTransactionsPopupOpen(false)}
				transactions={transactions}
				currency={wallet.currency}
			/>
		</>
	);
};
