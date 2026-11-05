export const CATEGORY_KIND = {
	EXPENSE: "Expense",
	INCOME: "Income",
} as const;

export type CategoryKind = (typeof CATEGORY_KIND)[keyof typeof CATEGORY_KIND];

export const CATEGORY_ICON_KEY = {
	OTHER: "other",
	GROCERIES: "groceries",
	CAFE: "cafe",
	TRANSPORT: "transport",
	SUBSCRIPTION: "subscription",
	SALARY: "salary",
	PHARMACY: "pharmacy",
	HEALTH: "health",
	SHOPPING: "shopping",
	ENTERTAINMENT: "entertainment",
	HOME: "home",
	UTILITIES: "utilities",
	EDUCATION: "education",
	TRAVEL: "travel",
	FOOD: "food",
	GIFTS: "gifts",
	INSURANCE: "insurance",
	PETS: "pets",
	FITNESS: "fitness",
	BUSINESS: "business",
} as const;

export type CategoryIconKey =
	(typeof CATEGORY_ICON_KEY)[keyof typeof CATEGORY_ICON_KEY];

export const CATEGORY_ICON_KEYS = Object.values(CATEGORY_ICON_KEY);

export const CATEGORY_NAME_MAX_LENGTH = 50;

export type UserCategory = {
	categoryId: string;
	name: string;
	iconKey: string;
	kind: CategoryKind;
	isSystemSeed: boolean;
	createdAtUtc: string;
};

// Label and icon from the API when the shared categories list is not used yet.
export type CategoryDisplaySource = Pick<
	UserCategory,
	"categoryId" | "name" | "iconKey"
>;

export type CreateCategoryRequest = {
	name: string;
	iconKey: string;
	kind: CategoryKind;
};

export type UpdateCategoryRequest = {
	name?: string;
	iconKey?: string;
};
