import type {CurrencyType} from "@/features/wallets/walletTypes";

export const TRANSACTION_KIND = {
	INCOME: "income",
	EXPENSE: "expense",
} as const;

export type TransactionKind =
	(typeof TRANSACTION_KIND)[keyof typeof TRANSACTION_KIND];

export type HomeDashboardWallet = {
	walletId: string;
	name: string;
	walletTypeLabel: string;
	currency: CurrencyType;
	balance: number;
};

export type HomeMonthSummary = {
	spent: number;
	income: number;
};

// TODO: Load categories from the user API when home is wired to real data.
export const ACTIVITY_CATEGORY = {
	CAFE: "cafe",
	SALARY: "salary",
	TRANSPORT: "transport",
	GROCERIES: "groceries",
	SUBSCRIPTION: "subscription",
} as const;

export type HomeActivityCategory =
	(typeof ACTIVITY_CATEGORY)[keyof typeof ACTIVITY_CATEGORY];

export type HomeDashboardTransaction = {
	id: string;
	title: string;
	category: HomeActivityCategory;
	kind: TransactionKind;
	amount: number;
	occurredLabel: string;
};
