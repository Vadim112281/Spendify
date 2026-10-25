import {parseCalendarTransactionDate} from "@/shared/utils/timeUtils";

export const isTransactionInCalendarMonth = (
	transactionDate: string,
	referenceDate: Date = new Date(),
): boolean => {
	const date = parseCalendarTransactionDate(transactionDate);

	return (
		date.getFullYear() === referenceDate.getFullYear() &&
		date.getMonth() === referenceDate.getMonth()
	);
};

type TransactionWithCalendarDate = {
	transactionDate: string;
};

export const filterTransactionsInCalendarMonth = <
	T extends TransactionWithCalendarDate,
>(
	transactions: T[],
	referenceDate: Date = new Date(),
): T[] =>
	transactions.filter((transaction) =>
		isTransactionInCalendarMonth(transaction.transactionDate, referenceDate),
	);
