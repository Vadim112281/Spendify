import type {CurrencyType} from "@/features/wallets/walletTypes";
import {HomeTransactionRow} from "@/pages/home/components/dashboard/transactions/HomeTransactionRow";
import type {HomeTransactionDateGroup} from "@/pages/home/services/homeDashboardTransactionsService";
import type {HomeDashboardTransaction} from "@/pages/home/types/homeDashboardTypes";
import {twx} from "@/shared/utils/twx";

type HomeTransactionsDateGroupProps = {
	group: HomeTransactionDateGroup;
	currency: CurrencyType;
	isFirst?: boolean;
	showGroupLabel?: boolean;
	openSwipeId: string | null;
	onSwipeOpenChange: (transactionId: string, open: boolean) => void;
	onEditTransaction: (transaction: HomeDashboardTransaction) => void;
	onDeleteTransaction: (transaction: HomeDashboardTransaction) => void;
};

export const HomeTransactionsDateGroup = ({
	group,
	currency,
	isFirst = false,
	showGroupLabel = true,
	openSwipeId,
	onSwipeOpenChange,
	onEditTransaction,
	onDeleteTransaction,
}: HomeTransactionsDateGroupProps) => {
	return (
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
					<HomeTransactionRow
						key={transaction.id}
						transaction={transaction}
						currency={currency}
						isSwipeOpen={openSwipeId === transaction.id}
						onSwipeOpenChange={(open) => {
							onSwipeOpenChange(transaction.id, open);
						}}
						onEdit={() => {
							onEditTransaction(transaction);
						}}
						onDelete={() => {
							onDeleteTransaction(transaction);
						}}
					/>
				))}
			</ul>
		</div>
	);
};
