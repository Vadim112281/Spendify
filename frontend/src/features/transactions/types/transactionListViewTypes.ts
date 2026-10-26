import type {TransactionCategory} from "@/features/transactions/types/transactionCategory";

export const TRANSACTION_KIND = {
	INCOME: "income",
	EXPENSE: "expense",
} as const;

export type TransactionKind =
	(typeof TRANSACTION_KIND)[keyof typeof TRANSACTION_KIND];

export type TransactionListViewItem = {
	id: string;
	title: string;
	category: TransactionCategory;
	kind: TransactionKind;
	amount: number;
	note: string;
	transactionDate: string;
	dateGroupLabel: string;
	createdAtUtc: string;
};
