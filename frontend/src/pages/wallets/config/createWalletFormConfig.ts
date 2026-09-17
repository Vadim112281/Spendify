import {
	CURRENCY_TYPE,
	type CurrencyType,
	WALLET_TYPE,
	type WalletType,
} from "@/features/wallets/walletTypes";

export const DEFAULT_WALLET_NAMES: Record<WalletType, string> = {
	[WALLET_TYPE.CASH]: "Cash Wallet",
	[WALLET_TYPE.CARD]: "Card Wallet",
};

export const WALLET_TYPE_OPTIONS: WalletType[] = [
	WALLET_TYPE.CASH,
	WALLET_TYPE.CARD,
];

export const CURRENCY_TYPE_OPTIONS: CurrencyType[] = [
	CURRENCY_TYPE.USD,
	CURRENCY_TYPE.EUR,
	CURRENCY_TYPE.UAH,
];

export const WALLET_TYPE_LABELS: Record<WalletType, string> = {
	[WALLET_TYPE.CASH]: "Cash",
	[WALLET_TYPE.CARD]: "Card",
};

export const WALLET_TYPE_DESCRIPTIONS: Record<WalletType, string> = {
	[WALLET_TYPE.CASH]: "Bills and coins",
	[WALLET_TYPE.CARD]: "Bank card spending",
};

type CurrencyTypeDisplay = {
	label: string;
	symbol: string;
};

export const CURRENCY_TYPE_DISPLAY: Record<CurrencyType, CurrencyTypeDisplay> =
	{
		[CURRENCY_TYPE.USD]: {label: "USD", symbol: "$"},
		[CURRENCY_TYPE.EUR]: {label: "EUR", symbol: "€"},
		[CURRENCY_TYPE.UAH]: {label: "UAH", symbol: "₴"},
	};
