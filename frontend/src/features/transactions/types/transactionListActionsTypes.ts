import type {TransactionCategory} from "@/features/transactions/types/transactionCategory";
import type {TransactionType} from "@/features/transactions/types/transactionTypes";

export type TransactionListActionTarget = {
	id: string;
	type: TransactionType;
	category: TransactionCategory;
	amount: number;
	note: string;
	transactionDate: string;
};
