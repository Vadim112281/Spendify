import type {
	TransactionCategory,
	TransactionType,
} from "@/features/transactions/types/transactionTypes";

export const TRANSACTION_KIND = {
	INCOME: "income",
	EXPENSE: "expense",
} as const;

export type TransactionKind =
	(typeof TRANSACTION_KIND)[keyof typeof TRANSACTION_KIND];

export type TransactionListViewItem = {
	id: string;
	category: TransactionCategory;
	kind: TransactionKind;
	amount: number;
	note: string;
	transactionDate: string;
	dateGroupLabel: string;
	createdAtUtc: string;
};

export type TransactionListActionTarget = {
	id: string;
	type: TransactionType;
	category: TransactionCategory;
	amount: number;
	note: string;
	transactionDate: string;
};
