import type {TransactionCategory} from "@/features/transactions/types/transactionCategory";

export const TRANSACTION_TYPE = {
	INCOME: "Income",
	EXPENSE: "Expense",
} as const;

export type TransactionType =
	(typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

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
	category: TransactionCategory;
	amount: number;
	note?: string;
	transactionDate: string;
};
