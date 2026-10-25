export const RECENT_MONTH_TRANSACTIONS_LIMIT = 5;

type SortableTransaction = {
	transactionDate: string;
	createdAtUtc: string;
};

const compareTransactionsNewestFirst = (
	left: SortableTransaction,
	right: SortableTransaction,
): number => {
	const dateCompare = right.transactionDate.localeCompare(left.transactionDate);
	if (dateCompare !== 0) {
		return dateCompare;
	}

	return right.createdAtUtc.localeCompare(left.createdAtUtc);
};

export const selectRecentMonthTransactions = <T extends SortableTransaction>(
	transactions: T[],
	limit: number = RECENT_MONTH_TRANSACTIONS_LIMIT,
): T[] =>
	[...transactions].sort(compareTransactionsNewestFirst).slice(0, limit);
