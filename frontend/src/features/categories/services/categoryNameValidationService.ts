import type {UserCategory} from "@/features/categories/types/categoryTypes";
import {CATEGORY_NAME_MAX_LENGTH} from "@/features/categories/types/categoryTypes";

export const categoryNameError = (
	name: string,
	categories: UserCategory[],
	kind: UserCategory["kind"],
	excludeCategoryId?: string,
): string | undefined => {
	const trimmed = name.trim();

	if (trimmed.length === 0) {
		return "Enter a name.";
	}

	if (trimmed.length > CATEGORY_NAME_MAX_LENGTH) {
		return "Maximum 50 characters.";
	}

	const normalized = trimmed.toLocaleLowerCase();
	const duplicate = categories.some(
		(category) =>
			category.kind === kind &&
			category.categoryId !== excludeCategoryId &&
			category.name.trim().toLocaleLowerCase() === normalized,
	);

	if (duplicate) {
		return "Name already used.";
	}

	return undefined;
};
