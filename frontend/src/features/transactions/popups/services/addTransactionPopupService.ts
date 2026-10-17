import {
	ADD_TRANSACTION_AMOUNT_MAX,
	ADD_TRANSACTION_AMOUNT_MIN,
} from "@/features/transactions/popups/config/addTransactionFormConfig";
import {
	CREATE_TRANSACTION_ERROR_CODE,
	type CreateTransactionErrorCode,
} from "@/features/transactions/popups/types/addTransactionErrorCodes";

const MAX_INPUT_DIGITS = 12;

const parseAmountInput = (amountInput: string): number | null => {
	const normalized = amountInput.trim();
	if (!normalized || normalized === ".") {
		return null;
	}

	const value = Number.parseFloat(normalized);
	if (!Number.isFinite(value)) {
		return null;
	}

	return value;
};

const getAmountInputErrorCode = (
	amountInput: string,
): CreateTransactionErrorCode | undefined => {
	const value = parseAmountInput(amountInput);
	if (value === null) {
		return CREATE_TRANSACTION_ERROR_CODE.TRANSACTION_AMOUNT_REQUIRED;
	}

	if (value < ADD_TRANSACTION_AMOUNT_MIN) {
		return CREATE_TRANSACTION_ERROR_CODE.TRANSACTION_AMOUNT_TOO_SMALL;
	}

	if (value > ADD_TRANSACTION_AMOUNT_MAX) {
		return CREATE_TRANSACTION_ERROR_CODE.TRANSACTION_AMOUNT_TOO_LARGE;
	}

	return undefined;
};

const isValidAmountInput = (amountInput: string): boolean =>
	getAmountInputErrorCode(amountInput) === undefined;

const appendAmountDigit = (current: string, digit: string): string => {
	if (digit !== "." && !/^\d$/.test(digit)) {
		return current;
	}

	const base = current === "" ? "0" : current;

	if (digit === "." && base.includes(".")) {
		return current;
	}

	const next = base === "0" && digit !== "." ? digit : `${base}${digit}`;

	if (next.includes(".")) {
		const [, fraction = ""] = next.split(".");
		if (fraction.length > 2) {
			return current;
		}
	}

	const digitCount = next.replace(".", "").length;
	if (digitCount > MAX_INPUT_DIGITS) {
		return current;
	}

	const parsed = parseAmountInput(next);
	if (parsed !== null && parsed > ADD_TRANSACTION_AMOUNT_MAX) {
		return current;
	}

	return next;
};

const backspaceAmountInput = (current: string): string => {
	if (!current) {
		return "";
	}

	const next = current.slice(0, -1);
	return next === "" ? "0" : next;
};

const formatAmountInputFromNumber = (amount: number): string => {
	if (!Number.isFinite(amount) || amount <= 0) {
		return "0";
	}

	const fixed = amount.toFixed(2);
	return fixed.replace(/\.?0+$/, "") || "0";
};

export const addTransactionPopupService = {
	parseAmountInput,
	isValidAmountInput,
	getAmountInputErrorCode,
	appendAmountDigit,
	backspaceAmountInput,
	formatAmountInputFromNumber,
};
