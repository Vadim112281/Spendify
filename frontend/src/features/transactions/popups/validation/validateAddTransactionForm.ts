import {ADD_TRANSACTION_NOTE_MAX_LENGTH} from "@/features/transactions/popups/config/addTransactionFormConfig";
import {addTransactionPopupService} from "@/features/transactions/popups/services/addTransactionPopupService";
import {CREATE_TRANSACTION_ERROR_CODE} from "@/features/transactions/popups/types/addTransactionErrorCodes";
import type {
	AddTransactionFieldErrorCodes,
	AddTransactionFormValues,
} from "@/features/transactions/popups/types/addTransactionFormTypes";

export const validateAddTransactionForm = (
	values: AddTransactionFormValues,
): AddTransactionFieldErrorCodes | null => {
	const errors: AddTransactionFieldErrorCodes = {};

	const amountInputError = addTransactionPopupService.getAmountInputErrorCode(
		values.amountInput,
	);
	if (amountInputError) {
		errors.amountInput = amountInputError;
	}

	if (!values.category) {
		errors.category =
			CREATE_TRANSACTION_ERROR_CODE.TRANSACTION_CATEGORY_REQUIRED;
	}

	if (!values.walletId) {
		errors.walletId = CREATE_TRANSACTION_ERROR_CODE.WALLET_ID_REQUIRED;
	}

	if (!values.transactionDate) {
		errors.transactionDate =
			CREATE_TRANSACTION_ERROR_CODE.TRANSACTION_DATE_REQUIRED;
	}

	if (values.note.trim().length > ADD_TRANSACTION_NOTE_MAX_LENGTH) {
		errors.note = CREATE_TRANSACTION_ERROR_CODE.TRANSACTION_NOTE_TOO_LONG;
	}

	return Object.keys(errors).length > 0 ? errors : null;
};
