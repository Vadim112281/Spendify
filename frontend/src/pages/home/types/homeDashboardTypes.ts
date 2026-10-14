import type {TransactionCategory} from "@/features/transactions/types/transactionCategory";
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

export type HomeDashboardTransaction = {
	id: string;
	title: string;
	category: TransactionCategory;
	kind: TransactionKind;
	amount: number;
	transactionDate: string;
	dateGroupLabel: string;
};
