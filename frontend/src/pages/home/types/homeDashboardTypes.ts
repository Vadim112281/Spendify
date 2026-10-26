import type {CurrencyType} from "@/features/wallets/walletTypes";

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
