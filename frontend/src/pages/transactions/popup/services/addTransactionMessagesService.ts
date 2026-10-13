import type {ApiError} from "@/app/api/httpClient";
import type {
	AddTransactionFieldErrorKey,
	AddTransactionFieldErrorCodes,
	AddTransactionFieldErrors,
} from "@/pages/transactions/popup/types/addTransactionFormTypes";
import {
	CREATE_TRANSACTION_ERROR_CODE,
	type CreateTransactionErrorCode,
} from "@/pages/transactions/popup/types/addTransactionErrorCodes";

const UNKNOWN_ERROR_MESSAGE = "Something went wrong. Please try again";

const API_FIELD_ERROR_KEYS: Exclude<
	AddTransactionFieldErrorKey,
	"amountInput"
>[] = ["category", "walletId", "note", "transactionDate"];

const CREATE_TRANSACTION_MESSAGES: Record<CreateTransactionErrorCode, string> =
	{
		[CREATE_TRANSACTION_ERROR_CODE.TRANSACTION_TYPE_REQUIRED]:
			"Choose income or expense",
		[CREATE_TRANSACTION_ERROR_CODE.INVALID_TRANSACTION_TYPE]:
			"Invalid transaction type",
		[CREATE_TRANSACTION_ERROR_CODE.TRANSACTION_CATEGORY_REQUIRED]:
			"Choose a category",
		[CREATE_TRANSACTION_ERROR_CODE.INVALID_TRANSACTION_CATEGORY]:
			"Invalid category",
		[CREATE_TRANSACTION_ERROR_CODE.TRANSACTION_AMOUNT_REQUIRED]:
			"Enter an amount",
		[CREATE_TRANSACTION_ERROR_CODE.TRANSACTION_AMOUNT_TOO_SMALL]:
			"Minimum amount is 0.01",
		[CREATE_TRANSACTION_ERROR_CODE.TRANSACTION_AMOUNT_TOO_LARGE]:
			"Amount is too large",
		[CREATE_TRANSACTION_ERROR_CODE.TRANSACTION_NOTE_TOO_LONG]:
			"Maximum 200 characters",
		[CREATE_TRANSACTION_ERROR_CODE.TRANSACTION_DATE_REQUIRED]:
			"Choose a date",
		[CREATE_TRANSACTION_ERROR_CODE.WALLET_ID_REQUIRED]: "Choose a wallet",
		[CREATE_TRANSACTION_ERROR_CODE.WALLET_NOT_FOUND]: "Wallet not found",
	};

const getMessage = (code: string): string =>
	CREATE_TRANSACTION_MESSAGES[code as CreateTransactionErrorCode] ??
	UNKNOWN_ERROR_MESSAGE;

const mapFieldErrorCodes = (
	codes: AddTransactionFieldErrorCodes,
): AddTransactionFieldErrors => {
	const fieldErrors: AddTransactionFieldErrors = {};

	for (const field in codes) {
		const code = codes[field as keyof AddTransactionFieldErrorCodes];
		if (code) {
			fieldErrors[field as keyof AddTransactionFieldErrors] = getMessage(code);
		}
	}

	return fieldErrors;
};

const mapCreateTransactionClientErrors = (
	codes: AddTransactionFieldErrorCodes,
): AddTransactionFieldErrors => mapFieldErrorCodes(codes);

type CreateTransactionApiFormErrors = {
	fieldErrors: AddTransactionFieldErrors;
	formError?: string;
};

const mapCreateTransactionApiError = (
	error: ApiError,
): CreateTransactionApiFormErrors => {
	const fieldErrors: AddTransactionFieldErrors = {};

	for (const field of API_FIELD_ERROR_KEYS) {
		const code = error.fieldErrors[field];
		if (code) {
			fieldErrors[field] = getMessage(code);
		}
	}

	const amountCode = error.fieldErrors.amount;
	if (amountCode) {
		fieldErrors.amountInput = getMessage(amountCode);
	}

	const hasFieldErrors =
		API_FIELD_ERROR_KEYS.some((field) => fieldErrors[field]) ||
		fieldErrors.amountInput;

	return {
		fieldErrors,
		formError: hasFieldErrors ? undefined : getMessage(error.code),
	};
};

const getCreateTransactionUnknownError = (): CreateTransactionApiFormErrors => ({
	fieldErrors: {},
	formError: UNKNOWN_ERROR_MESSAGE,
});

export const addTransactionMessagesService = {
	mapCreateTransactionClientErrors,
	mapCreateTransactionApiError,
	getCreateTransactionUnknownError,
};
