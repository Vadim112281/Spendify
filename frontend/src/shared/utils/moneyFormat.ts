// Four-per-em space — between thin and en space.
const AMOUNT_GROUP_SEPARATOR = "\u2005";

export const formatAmountWithSpaceSeparators = (
	amount: number,
	options?: {maximumFractionDigits?: number},
): string => {
	const maximumFractionDigits = options?.maximumFractionDigits ?? 0;

	return Math.abs(amount)
		.toLocaleString("en-US", {maximumFractionDigits})
		.replace(/,/g, AMOUNT_GROUP_SEPARATOR);
};

export const formatAmountInputDisplay = (amountInput: string): string => {
	const normalized = amountInput.trim();
	if (!normalized || normalized === ".") {
		return normalized === "." ? "0." : "0";
	}

	const parsed = Number.parseFloat(normalized);
	if (!Number.isFinite(parsed)) {
		return normalized;
	}

	const dotIndex = normalized.indexOf(".");
	const intGrouped = formatAmountWithSpaceSeparators(
		Math.trunc(Math.abs(parsed)),
	);

	if (dotIndex < 0) {
		return intGrouped;
	}

	if (normalized.endsWith(".")) {
		return `${intGrouped}.`;
	}

	const fraction = normalized.slice(dotIndex + 1).replace(/\D/g, "");
	return fraction ? `${intGrouped}.${fraction}` : `${intGrouped}.`;
};

export const formatCurrencyAmount = (
	amount: number,
	currencySymbol: string,
	options?: {signed?: boolean},
): string => {
	const digits = formatAmountWithSpaceSeparators(amount);

	if (options?.signed) {
		if (amount > 0) {
			return `+${currencySymbol}${digits}`;
		}
		if (amount < 0) {
			return `−${currencySymbol}${digits}`;
		}
	}

	return `${currencySymbol}${digits}`;
};
