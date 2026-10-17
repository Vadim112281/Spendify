import type {EditTransactionTarget} from "@/features/transactions/popups/types/editTransactionTypes";
import type {TransactionCategory} from "@/features/transactions/types/transactionCategory";
import {
	TRANSACTION_TYPE,
	type Transaction,
} from "@/features/transactions/types/transactionTypes";
import {
	type HomeDashboardTransaction,
	TRANSACTION_KIND,
} from "@/pages/home/types/homeDashboardTypes";
import {formatTransactionDateGroupLabel} from "@/shared/utils/timeUtils";

const getTransactionTitle = (
	category: TransactionCategory,
	note: string | null,
): string => {
	const trimmedNote = note?.trim();
	return trimmedNote && trimmedNote.length > 0 ? trimmedNote : category;
};

const mapHomeDashboardTransaction = (
	transaction: Transaction,
): HomeDashboardTransaction => ({
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
});

export type HomeTransactionDateGroup = {
	dateKey: string;
	label: string;
	transactions: HomeDashboardTransaction[];
};

const groupHomeTransactionsByDate = (
	transactions: HomeDashboardTransaction[],
): HomeTransactionDateGroup[] => {
	const groups: HomeTransactionDateGroup[] = [];
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

const mapHomeTransactionToEditTarget = (
	walletId: string,
	transaction: HomeDashboardTransaction,
): EditTransactionTarget => ({
	transactionId: transaction.id,
	walletId,
	type:
		transaction.kind === TRANSACTION_KIND.INCOME
			? TRANSACTION_TYPE.INCOME
			: TRANSACTION_TYPE.EXPENSE,
	category: transaction.category,
	amount: transaction.amount,
	note: transaction.note,
	transactionDate: transaction.transactionDate,
});

export {
	groupHomeTransactionsByDate,
	mapHomeDashboardTransaction,
	mapHomeTransactionToEditTarget,
};
