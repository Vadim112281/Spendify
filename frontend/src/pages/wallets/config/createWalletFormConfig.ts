import {WALLET_TYPE, type WalletType} from "@/features/wallets/walletTypes";

export const WALLET_TYPE_OPTIONS: WalletType[] = [
	WALLET_TYPE.CASH,
	WALLET_TYPE.CARD,
];

export const WALLET_TYPE_DESCRIPTIONS: Record<WalletType, string> = {
	[WALLET_TYPE.CASH]: "Bills and coins",
	[WALLET_TYPE.CARD]: "Bank card spending",
};
