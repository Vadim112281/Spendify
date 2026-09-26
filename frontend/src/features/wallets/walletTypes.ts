export const WALLET_TYPE = {
	CASH: "Cash",
	CARD: "Card",
} as const;

export type WalletType = (typeof WALLET_TYPE)[keyof typeof WALLET_TYPE];

export const CURRENCY_TYPE = {
	USD: "USD",
	EUR: "EUR",
	UAH: "UAH",
} as const;

export type CurrencyType = (typeof CURRENCY_TYPE)[keyof typeof CURRENCY_TYPE];

export type Wallet = {
	walletId: string;
	walletName: string | null;
	walletType: WalletType;
	currencyType: CurrencyType;
	createdAtUtc: string;
};

export type CreateWalletRequest = {
	walletName?: string;
	walletType: WalletType;
	currencyType: CurrencyType;
};
