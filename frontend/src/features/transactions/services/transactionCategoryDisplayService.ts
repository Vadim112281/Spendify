import {resolveCategoryName} from "@/features/categories/services/categoryDisplayService";
import type {
	CategoryDisplaySource,
	UserCategory,
} from "@/features/categories/types/categoryTypes";

type TransactionRowCategoryFields = {
	note: string;
	category: CategoryDisplaySource;
};

export const resolveTransactionRowTitle = (
	categories: UserCategory[],
	transaction: TransactionRowCategoryFields,
): string =>
	transaction.note.length > 0
		? transaction.note
		: resolveCategoryName(categories, transaction.category);
