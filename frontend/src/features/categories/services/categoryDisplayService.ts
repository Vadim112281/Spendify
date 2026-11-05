import type {
	CategoryDisplaySource,
	UserCategory,
} from "@/features/categories/types/categoryTypes";

const findCategoryInList = (
	categories: UserCategory[],
	categoryId: string,
): UserCategory | undefined =>
	categories.find((category) => category.categoryId === categoryId);

export const resolveCategoryIconKey = (
	categories: UserCategory[],
	source: CategoryDisplaySource,
): string =>
	findCategoryInList(categories, source.categoryId)?.iconKey ?? source.iconKey;

export const resolveCategoryName = (
	categories: UserCategory[],
	source: CategoryDisplaySource,
): string =>
	findCategoryInList(categories, source.categoryId)?.name ?? source.name;
