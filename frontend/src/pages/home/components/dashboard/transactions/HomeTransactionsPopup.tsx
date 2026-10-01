import type {CurrencyType} from "@/features/wallets/walletTypes";
import {HomeTransactionRow} from "@/pages/home/components/dashboard/transactions/HomeTransactionRow";
import type {HomeDashboardTransaction} from "@/pages/home/types/homeDashboardTypes";
import {AppPopup} from "@/shared/ui/AppPopup/AppPopup";
import {twx} from "@/shared/utils/twx";

type HomeTransactionsPopupProps = {
	open: boolean;
	onClose: () => void;
	transactions: HomeDashboardTransaction[];
	currency: CurrencyType;
};

export const HomeTransactionsPopup = ({
	open,
	onClose,
	transactions,
	currency,
}: HomeTransactionsPopupProps) => (
	<AppPopup
		open={open}
		onOpenChange={(nextOpen) => {
			if (!nextOpen) {
				onClose();
			}
		}}
		title="Recent"
		description={`${transactions.length} transactions`}
	>
		<ul
			className={twx(
				"m-0 min-h-0 flex-1 list-none divide-y divide-white/8 overflow-y-auto p-0 px-20",
				"scrollbar-hidden overscroll-y-contain",
			)}
		>
			{transactions.map((transaction) => (
				<HomeTransactionRow
					key={transaction.id}
					transaction={transaction}
					currency={currency}
				/>
			))}
		</ul>
	</AppPopup>
);
