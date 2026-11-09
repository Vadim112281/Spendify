import type {CategoryKind} from "@/features/categories/types/categoryTypes";

export const TRANSACTION_TYPE = {
	INCOME: "Income",
	EXPENSE: "Expense",
} as const;

export type TransactionType =
	(typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

// Category id, name, icon, and kind as included on each transaction from the API.
export type TransactionCategory = {
	categoryId: string;
	name: string;
	iconKey: string;
	kind: CategoryKind;
};

export type Transaction = {
	transactionId: string;
	walletId: string;
	type: TransactionType;
	category: TransactionCategory;
	amount: number;
	note: string | null;
	transactionDate: string;
	createdAtUtc: string;
};

export type CreateTransactionRequest = {
	type: TransactionType;
	categoryId: string;
	amount: number;
	note?: string;
	transactionDate: string;
};

export type UpdateTransactionRequest = {
	type: TransactionType;
	categoryId: string;
	amount: number;
	note?: string;
	transactionDate: string;
};
