import type {ApiError} from "@/app/api/httpClient";
import type {
	CreateWalletFieldErrorCodes,
	CreateWalletFieldErrors,
	CreateWalletFormValues,
} from "@/pages/wallets/types/createWalletFormTypes";
import {
	CREATE_WALLET_ERROR_CODE,
	type CreateWalletErrorCode,
} from "@/pages/wallets/types/walletErrorCodes";

const UNKNOWN_ERROR_MESSAGE = "Something went wrong. Please try again";

const CREATE_WALLET_FORM_FIELDS: (keyof CreateWalletFormValues)[] = [
	"walletName",
	"walletType",
	"currencyType",
];

const CREATE_WALLET_MESSAGES: Record<CreateWalletErrorCode, string> = {
	[CREATE_WALLET_ERROR_CODE.WALLET_NAME_TOO_LONG]: "Maximum 50 characters",
	[CREATE_WALLET_ERROR_CODE.WALLET_TYPE_REQUIRED]: "Choose wallet type",
	[CREATE_WALLET_ERROR_CODE.INVALID_WALLET_TYPE]: "Invalid wallet type",
	[CREATE_WALLET_ERROR_CODE.CURRENCY_TYPE_REQUIRED]: "Choose currency",
	[CREATE_WALLET_ERROR_CODE.INVALID_CURRENCY_TYPE]: "Invalid currency",
};

export const getCreateWalletMessage = (code: string): string =>
	CREATE_WALLET_MESSAGES[code as CreateWalletErrorCode] ??
	UNKNOWN_ERROR_MESSAGE;

const mapFieldErrorCodes = (
	codes: CreateWalletFieldErrorCodes,
): CreateWalletFieldErrors => {
	const fieldErrors: CreateWalletFieldErrors = {};

	for (const field in codes) {
		const code = codes[field as keyof CreateWalletFieldErrorCodes];
		if (code) {
			fieldErrors[field as keyof CreateWalletFieldErrors] =
				getCreateWalletMessage(code);
		}
	}

	return fieldErrors;
};

export const mapCreateWalletClientErrors = (
	codes: CreateWalletFieldErrorCodes,
): CreateWalletFieldErrors => mapFieldErrorCodes(codes);

type CreateWalletApiFormErrors = {
	fieldErrors: CreateWalletFieldErrors;
	formError?: string;
};

export const mapCreateWalletApiError = (
	error: ApiError,
): CreateWalletApiFormErrors => {
	const fieldErrors: CreateWalletFieldErrors = {};

	for (const field of CREATE_WALLET_FORM_FIELDS) {
		const code = error.fieldErrors[field];
		if (code) {
			fieldErrors[field] = getCreateWalletMessage(code);
		}
	}

	const hasFieldErrors = CREATE_WALLET_FORM_FIELDS.some(
		(field) => fieldErrors[field],
	);

	return {
		fieldErrors,
		formError: hasFieldErrors ? undefined : getCreateWalletMessage(error.code),
	};
};

export const getCreateWalletUnknownError = (): CreateWalletApiFormErrors => ({
	fieldErrors: {},
	formError: UNKNOWN_ERROR_MESSAGE,
});
