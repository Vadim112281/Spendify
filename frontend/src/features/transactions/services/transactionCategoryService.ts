import type {CategoryKind} from "@/features/categories/types/categoryTypes";
import {CATEGORY_KIND} from "@/features/categories/types/categoryTypes";
import {
	TRANSACTION_TYPE,
	type TransactionType,
} from "@/features/transactions/types/transactionTypes";

export const categoryKindForTransactionType = (
	type: TransactionType,
): CategoryKind =>
	type === TRANSACTION_TYPE.INCOME
		? CATEGORY_KIND.INCOME
		: CATEGORY_KIND.EXPENSE;
