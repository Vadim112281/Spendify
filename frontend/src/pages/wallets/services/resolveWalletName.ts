import type {WalletType} from "@/features/wallets/walletTypes";
import {DEFAULT_WALLET_NAMES} from "@/pages/wallets/config/createWalletFormConfig";

const PREVIEW_NAME_BEFORE_TYPE = "New wallet";

export const resolveWalletName = (
	walletName: string,
	walletType: WalletType,
): string => {
	const trimmed = walletName.trim();
	return trimmed || DEFAULT_WALLET_NAMES[walletType];
};

export const resolveWalletPreviewName = (
	walletName: string,
	walletType: WalletType | null,
): string => {
	const trimmed = walletName.trim();
	if (trimmed) {
		return trimmed;
	}

	if (walletType) {
		return DEFAULT_WALLET_NAMES[walletType];
	}

	return PREVIEW_NAME_BEFORE_TYPE;
};
