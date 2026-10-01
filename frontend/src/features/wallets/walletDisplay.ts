import {
	CURRENCY_TYPE,
	type CurrencyType,
	WALLET_TYPE,
	type WalletType,
} from "@/features/wallets/walletTypes";

type CurrencyTypeDisplay = {
	label: string;
	symbol: string;
};

export const CURRENCY_TYPE_OPTIONS: CurrencyType[] = [
	CURRENCY_TYPE.USD,
	CURRENCY_TYPE.EUR,
	CURRENCY_TYPE.UAH,
];

export const CURRENCY_TYPE_DISPLAY: Record<CurrencyType, CurrencyTypeDisplay> =
	{
		[CURRENCY_TYPE.USD]: {label: "USD", symbol: "$"},
		[CURRENCY_TYPE.EUR]: {label: "EUR", symbol: "€"},
		[CURRENCY_TYPE.UAH]: {label: "UAH", symbol: "₴"},
	};

export const DEFAULT_WALLET_NAMES: Record<WalletType, string> = {
	[WALLET_TYPE.CASH]: "Cash Wallet",
	[WALLET_TYPE.CARD]: "Card Wallet",
};

export const WALLET_TYPE_LABELS: Record<WalletType, string> = {
	[WALLET_TYPE.CASH]: "Cash",
	[WALLET_TYPE.CARD]: "Card",
};

const trimWalletName = (walletName: string | undefined | null): string =>
	walletName?.trim() ?? "";

export const getWalletDisplayName = (
	walletName: string | undefined | null,
	walletType: WalletType,
): string => {
	const trimmed = trimWalletName(walletName);
	return trimmed || DEFAULT_WALLET_NAMES[walletType];
};

export const getWalletDisplayNameForPreview = (
	walletName: string,
	walletType: WalletType | null,
	beforeTypeSelected: string,
): string => {
	if (walletType) {
		return getWalletDisplayName(walletName, walletType);
	}

	const trimmed = trimWalletName(walletName);
	return trimmed || beforeTypeSelected;
};
