export const TRANSACTIONS_VIEW_FILTER = {
	EXPENSES: "expenses",
	INCOME: "income",
	ALL: "all",
} as const;

export type TransactionsViewFilter =
	(typeof TRANSACTIONS_VIEW_FILTER)[keyof typeof TRANSACTIONS_VIEW_FILTER];
