import type {TransactionDateGroup} from "@/features/transactions/services/transactionListViewService";
import type {CurrencyType} from "@/features/wallets/walletTypes";
import {HomeRecentTransactionRow} from "@/pages/home/components/dashboard/transactions/HomeRecentTransactionRow";
import {twx} from "@/shared/utils/twx";

type HomeRecentTransactionsDateGroupProps = {
	group: TransactionDateGroup;
	currency: CurrencyType;
	isFirst?: boolean;
	showGroupLabel?: boolean;
	onRowPress: (transactionId: string) => void;
};

export const HomeRecentTransactionsDateGroup = ({
	group,
	currency,
	isFirst = false,
	showGroupLabel = true,
	onRowPress,
}: HomeRecentTransactionsDateGroupProps) => (
	<div>
		{showGroupLabel ? (
			<p
				className={twx(
					"m-0 mb-8 text-11 font-medium tracking-label text-e-zinc uppercase",
					isFirst ? "mt-0" : "mt-16",
				)}
			>
				{group.label}
			</p>
		) : null}
		<ul className="m-0 flex list-none flex-col gap-8 p-0">
			{group.transactions.map((transaction) => (
				<HomeRecentTransactionRow
					key={transaction.id}
					transaction={transaction}
					currency={currency}
					onPress={() => {
						onRowPress(transaction.id);
					}}
				/>
			))}
		</ul>
	</div>
);
