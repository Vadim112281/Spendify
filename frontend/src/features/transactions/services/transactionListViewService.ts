import type {TransactionCategory} from "@/features/transactions/types/transactionCategory";
import type {TransactionListActionTarget} from "@/features/transactions/types/transactionListActionsTypes";
import {
	TRANSACTION_KIND,
	type TransactionListViewItem,
} from "@/features/transactions/types/transactionListViewTypes";
import {
	TRANSACTION_TYPE,
	type Transaction,
} from "@/features/transactions/types/transactionTypes";
import {formatTransactionDateGroupLabel} from "@/shared/utils/timeUtils";

const getTransactionTitle = (
	category: TransactionCategory,
	note: string | null,
): string => {
	const trimmedNote = note?.trim();
	return trimmedNote && trimmedNote.length > 0 ? trimmedNote : category;
};

export const mapTransactionToListView = (
	transaction: Transaction,
): TransactionListViewItem => ({
	id: transaction.transactionId,
	title: getTransactionTitle(transaction.category, transaction.note),
	category: transaction.category,
	kind:
		transaction.type === TRANSACTION_TYPE.INCOME
			? TRANSACTION_KIND.INCOME
			: TRANSACTION_KIND.EXPENSE,
	amount: transaction.amount,
	note: transaction.note?.trim() ?? "",
	transactionDate: transaction.transactionDate,
	dateGroupLabel: formatTransactionDateGroupLabel(transaction.transactionDate),
	createdAtUtc: transaction.createdAtUtc,
});

export type TransactionDateGroup = {
	dateKey: string;
	label: string;
	transactions: TransactionListViewItem[];
};

export const groupTransactionsByDate = (
	transactions: TransactionListViewItem[],
): TransactionDateGroup[] => {
	const groups: TransactionDateGroup[] = [];
	const groupIndexByDateKey = new Map<string, number>();

	for (const transaction of transactions) {
		const existingIndex = groupIndexByDateKey.get(transaction.transactionDate);

		if (existingIndex === undefined) {
			groupIndexByDateKey.set(transaction.transactionDate, groups.length);
			groups.push({
				dateKey: transaction.transactionDate,
				label: transaction.dateGroupLabel,
				transactions: [transaction],
			});
			continue;
		}

		groups[existingIndex].transactions.push(transaction);
	}

	return groups;
};

export const mapListViewToListActionTarget = (
	transaction: TransactionListViewItem,
): TransactionListActionTarget => ({
	id: transaction.id,
	type:
		transaction.kind === TRANSACTION_KIND.INCOME
			? TRANSACTION_TYPE.INCOME
			: TRANSACTION_TYPE.EXPENSE,
	category: transaction.category,
	amount: transaction.amount,
	note: transaction.note,
	transactionDate: transaction.transactionDate,
});
