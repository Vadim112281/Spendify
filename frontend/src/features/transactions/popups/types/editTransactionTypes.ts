import type {AddTransactionFormValues} from "@/features/transactions/popups/types/addTransactionFormTypes";
import type {TransactionType} from "@/features/transactions/types/transactionTypes";

export type EditTransactionTarget = {
	transactionId: string;
	walletId: string;
	type: TransactionType;
	category: AddTransactionFormValues["category"];
	amount: number;
	note: string;
	transactionDate: string;
};
