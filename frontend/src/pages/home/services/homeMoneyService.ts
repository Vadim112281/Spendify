import {CURRENCY_TYPE_DISPLAY} from "@/features/wallets/walletDisplay";
import type {CurrencyType} from "@/features/wallets/walletTypes";

const formatAmountDigits = (amount: number): string =>
	Math.abs(amount)
		.toLocaleString("en-US", {maximumFractionDigits: 0})
		.replace(/,/g, " ");

export const formatHomeMoney = (
	amount: number,
	currency: CurrencyType,
	options?: {signed?: boolean},
): string => {
	const symbol = CURRENCY_TYPE_DISPLAY[currency].symbol;
	const digits = formatAmountDigits(amount);

	if (options?.signed) {
		if (amount > 0) {
			return `+${symbol}${digits}`;
		}
		if (amount < 0) {
			return `−${symbol}${digits}`;
		}
	}

	return `${symbol}${digits}`;
};
