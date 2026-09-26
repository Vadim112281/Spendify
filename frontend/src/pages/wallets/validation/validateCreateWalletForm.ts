import {
	CURRENCY_TYPE,
	type CurrencyType,
	WALLET_TYPE,
	type WalletType,
} from "@/features/wallets/walletTypes";
import type {
	CreateWalletFieldErrorCodes,
	CreateWalletFormValues,
} from "@/pages/wallets/types/createWalletFormTypes";
import {
	CREATE_WALLET_ERROR_CODE,
	type CreateWalletErrorCode,
} from "@/pages/wallets/types/walletErrorCodes";

const WALLET_NAME_MAX_LENGTH = 50;

const WALLET_TYPE_VALUES = new Set<string>(Object.values(WALLET_TYPE));
const CURRENCY_TYPE_VALUES = new Set<string>(Object.values(CURRENCY_TYPE));

const isWalletType = (value: string): value is WalletType =>
	WALLET_TYPE_VALUES.has(value);

const isCurrencyType = (value: string): value is CurrencyType =>
	CURRENCY_TYPE_VALUES.has(value);

const getWalletNameErrorCode = (
	walletName: string,
): CreateWalletErrorCode | undefined => {
	const trimmed = walletName.trim();

	if (trimmed.length > WALLET_NAME_MAX_LENGTH) {
		return CREATE_WALLET_ERROR_CODE.WALLET_NAME_TOO_LONG;
	}
};

const getWalletTypeErrorCode = (
	walletType: WalletType | null,
): CreateWalletErrorCode | undefined => {
	if (walletType === null) {
		return CREATE_WALLET_ERROR_CODE.WALLET_TYPE_REQUIRED;
	}

	if (!isWalletType(walletType)) {
		return CREATE_WALLET_ERROR_CODE.INVALID_WALLET_TYPE;
	}
};

const getCurrencyTypeErrorCode = (
	currencyType: CurrencyType | null,
): CreateWalletErrorCode | undefined => {
	if (currencyType === null) {
		return CREATE_WALLET_ERROR_CODE.CURRENCY_TYPE_REQUIRED;
	}

	if (!isCurrencyType(currencyType)) {
		return CREATE_WALLET_ERROR_CODE.INVALID_CURRENCY_TYPE;
	}
};

const toFieldErrorCodes = (
	codes: Record<string, CreateWalletErrorCode | undefined>,
): CreateWalletFieldErrorCodes | null => {
	const errors: CreateWalletFieldErrorCodes = {};

	for (const field in codes) {
		const code = codes[field];
		if (code) {
			errors[field as keyof CreateWalletFieldErrorCodes] = code;
		}
	}

	return Object.keys(errors).length > 0 ? errors : null;
};

export const validateCreateWalletForm = (
	values: CreateWalletFormValues,
): CreateWalletFieldErrorCodes | null => {
	const walletNameCode = getWalletNameErrorCode(values.walletName);
	const walletTypeCode = getWalletTypeErrorCode(values.walletType);
	const currencyTypeCode = getCurrencyTypeErrorCode(values.currencyType);

	return toFieldErrorCodes({
		walletName: walletNameCode,
		walletType: walletTypeCode,
		currencyType: currencyTypeCode,
	});
};
