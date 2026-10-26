import {TransactionRow} from "@/features/transactions/components/list/TransactionRow";
import type {TransactionDateGroup} from "@/features/transactions/services/transactionListViewService";
import type {TransactionListViewItem} from "@/features/transactions/types/transactionListViewTypes";
import type {CurrencyType} from "@/features/wallets/walletTypes";
import {twx} from "@/shared/utils/twx";

type TransactionsDateGroupProps = {
	group: TransactionDateGroup;
	currency: CurrencyType;
	isFirst?: boolean;
	showGroupLabel?: boolean;
	openSwipeId: string | null;
	onSwipeOpenChange: (transactionId: string, open: boolean) => void;
	onEditTransaction: (transaction: TransactionListViewItem) => void;
	onDeleteTransaction: (transaction: TransactionListViewItem) => void;
	focusTransactionId?: string | null;
};

export const TransactionsDateGroup = ({
	group,
	currency,
	isFirst = false,
	showGroupLabel = true,
	openSwipeId,
	onSwipeOpenChange,
	onEditTransaction,
	onDeleteTransaction,
	focusTransactionId = null,
}: TransactionsDateGroupProps) => {
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
					<TransactionRow
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
						isFocusPulsing={focusTransactionId === transaction.id}
					/>
				))}
			</ul>
		</div>
	);
};
