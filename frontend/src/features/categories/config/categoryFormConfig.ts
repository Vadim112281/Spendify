import {
	CATEGORY_ICON_KEY,
	CATEGORY_ICON_KEYS,
	type CategoryIconKey,
} from "@/features/categories/types/categoryTypes";

// First row of the create-sheet mock — order matches ux-designs key-category-form-create.
export const CATEGORY_FORM_PRIMARY_ICON_KEYS: CategoryIconKey[] = [
	CATEGORY_ICON_KEY.GROCERIES,
	CATEGORY_ICON_KEY.PHARMACY,
	CATEGORY_ICON_KEY.HEALTH,
	CATEGORY_ICON_KEY.TRANSPORT,
	CATEGORY_ICON_KEY.HOME,
	CATEGORY_ICON_KEY.FOOD,
	CATEGORY_ICON_KEY.GIFTS,
];

export const CATEGORY_FORM_SECONDARY_ICON_KEYS: CategoryIconKey[] =
	CATEGORY_ICON_KEYS.filter(
		(key) => !CATEGORY_FORM_PRIMARY_ICON_KEYS.includes(key),
	);

export const isCategoryFormPrimaryIconKey = (iconKey: string): boolean =>
	CATEGORY_FORM_PRIMARY_ICON_KEYS.includes(iconKey as CategoryIconKey);

export const categoryFormIconGridStartsExpanded = (
	iconKey: string | undefined,
): boolean => iconKey !== undefined && !isCategoryFormPrimaryIconKey(iconKey);
