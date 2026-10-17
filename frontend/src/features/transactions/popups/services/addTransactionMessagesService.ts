import type {ApiError} from "@/app/api/httpClient";
import {
	TRANSACTION_API_ERROR_CODE,
	type TransactionApiErrorCode,
} from "@/features/transactions/popups/types/addTransactionErrorCodes";
import type {
	AddTransactionFieldErrorCodes,
	AddTransactionFieldErrorKey,
	AddTransactionFieldErrors,
} from "@/features/transactions/popups/types/addTransactionFormTypes";

const UNKNOWN_ERROR_MESSAGE = "Something went wrong. Please try again";

const API_FIELD_ERROR_KEYS: Exclude<
	AddTransactionFieldErrorKey,
	"amountInput"
>[] = ["category", "walletId", "note", "transactionDate"];

const TRANSACTION_API_ERROR_MESSAGES: Record<TransactionApiErrorCode, string> =
	{
		[TRANSACTION_API_ERROR_CODE.TRANSACTION_TYPE_REQUIRED]:
			"Choose income or expense",
		[TRANSACTION_API_ERROR_CODE.INVALID_TRANSACTION_TYPE]:
			"Invalid transaction type",
		[TRANSACTION_API_ERROR_CODE.TRANSACTION_CATEGORY_REQUIRED]:
			"Choose a category",
		[TRANSACTION_API_ERROR_CODE.INVALID_TRANSACTION_CATEGORY]:
			"Invalid category",
		[TRANSACTION_API_ERROR_CODE.TRANSACTION_AMOUNT_REQUIRED]:
			"Enter an amount",
		[TRANSACTION_API_ERROR_CODE.TRANSACTION_AMOUNT_TOO_SMALL]:
			"Minimum amount is 0.01",
		[TRANSACTION_API_ERROR_CODE.TRANSACTION_AMOUNT_TOO_LARGE]:
			"Amount is too large",
		[TRANSACTION_API_ERROR_CODE.TRANSACTION_NOTE_TOO_LONG]:
			"Maximum 200 characters",
		[TRANSACTION_API_ERROR_CODE.TRANSACTION_DATE_REQUIRED]: "Choose a date",
		[TRANSACTION_API_ERROR_CODE.WALLET_ID_REQUIRED]: "Choose a wallet",
		[TRANSACTION_API_ERROR_CODE.WALLET_NOT_FOUND]: "Wallet not found",
		[TRANSACTION_API_ERROR_CODE.TRANSACTION_ID_REQUIRED]:
			"Transaction is required",
		[TRANSACTION_API_ERROR_CODE.TRANSACTION_UPDATE_FIELDS_REQUIRED]:
			"Change at least one field to update",
		[TRANSACTION_API_ERROR_CODE.TRANSACTION_NOT_FOUND]:
			"Transaction not found",
	};

const getApiErrorMessage = (code: string): string =>
	TRANSACTION_API_ERROR_MESSAGES[code as TransactionApiErrorCode] ??
	UNKNOWN_ERROR_MESSAGE;

const mapFieldErrorCodes = (
	codes: AddTransactionFieldErrorCodes,
): AddTransactionFieldErrors => {
	const fieldErrors: AddTransactionFieldErrors = {};

	for (const field in codes) {
		const code = codes[field as keyof AddTransactionFieldErrorCodes];
		if (code) {
			fieldErrors[field as keyof AddTransactionFieldErrors] =
				getApiErrorMessage(code);
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

const mapTransactionApiError = (error: ApiError): CreateTransactionApiFormErrors => {
	const fieldErrors: AddTransactionFieldErrors = {};

	for (const field of API_FIELD_ERROR_KEYS) {
		const code = error.fieldErrors[field];
		if (code) {
			fieldErrors[field] = getApiErrorMessage(code);
		}
	}

	const amountCode = error.fieldErrors.amount;
	if (amountCode) {
		fieldErrors.amountInput = getApiErrorMessage(amountCode);
	}

	const hasFieldErrors =
		API_FIELD_ERROR_KEYS.some((field) => fieldErrors[field]) ||
		fieldErrors.amountInput;

	return {
		fieldErrors,
		formError: hasFieldErrors ? undefined : getApiErrorMessage(error.code),
	};
};

const mapCreateTransactionApiError = mapTransactionApiError;

const getCreateTransactionUnknownError =
	(): CreateTransactionApiFormErrors => ({
		fieldErrors: {},
		formError: UNKNOWN_ERROR_MESSAGE,
	});

export const addTransactionMessagesService = {
	mapCreateTransactionClientErrors,
	mapCreateTransactionApiError,
	getCreateTransactionUnknownError,
	mapTransactionClientErrors: mapCreateTransactionClientErrors,
	mapTransactionApiError,
	getTransactionUnknownError: getCreateTransactionUnknownError,
};
