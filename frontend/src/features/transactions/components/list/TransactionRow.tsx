import {useMemo} from "react";
import {TransactionRowContent} from "@/features/transactions/components/list/TransactionRowContent";
import type {TransactionListViewItem} from "@/features/transactions/types/transactionListViewTypes";
import type {CurrencyType} from "@/features/wallets/walletTypes";
import {
	AppSwipeRow,
	type AppSwipeRowAction,
} from "@/shared/ui/AppSwipeRow/AppSwipeRow";

type TransactionRowProps = {
	transaction: TransactionListViewItem;
	currency: CurrencyType;
	isSwipeOpen: boolean;
	onSwipeOpenChange: (open: boolean) => void;
	onEdit: () => void;
	onDelete: () => void;
	isFocusPulsing?: boolean;
};

export const TransactionRow = ({
	transaction,
	currency,
	isSwipeOpen,
	onSwipeOpenChange,
	onEdit,
	onDelete,
	isFocusPulsing = false,
}: TransactionRowProps) => {
	const actions = useMemo<AppSwipeRowAction[]>(
		() => [
			{
				id: "edit",
				label: "Edit",
				tone: "neutral",
				onPress: onEdit,
			},
			{
				id: "delete",
				label: "Delete",
				tone: "destructive",
				onPress: onDelete,
			},
		],
		[onDelete, onEdit],
	);

	return (
		<li data-transaction-id={transaction.id}>
			<AppSwipeRow
				actions={actions}
				isOpen={isSwipeOpen}
				onOpenChange={onSwipeOpenChange}
				focusHighlighted={isFocusPulsing}
			>
				<TransactionRowContent transaction={transaction} currency={currency} />
			</AppSwipeRow>
		</li>
	);
};
