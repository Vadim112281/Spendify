import {
	CHART_TYPE_EXPENSE_COLOR,
	CHART_TYPE_INCOME_COLOR,
	EXPENSE_CATEGORY_CHART_COLORS,
	EXPENSE_CATEGORY_OTHER_COLOR,
	INCOME_CATEGORY_CHART_COLORS,
	INCOME_CATEGORY_OTHER_COLOR,
} from "@/features/transactions/config/categoryChartColors";
import type {TransactionCategory} from "@/features/transactions/types/transactionCategory";
import {
	TRANSACTIONS_VIEW_FILTER,
	type TransactionsViewFilter,
} from "@/features/transactions/types/transactionsViewFilter";
import {
	TRANSACTION_TYPE,
	type Transaction,
} from "@/features/transactions/types/transactionTypes";

const MAX_CATEGORY_SEGMENTS = 4;

const toSharePercent = (amount: number, total: number) =>
	total > 0 ? (amount / total) * 100 : 0;

export const formatInsightsShareLabel = (
	sharePercent: number,
	amount: number,
): string =>
	amount > 0 && Math.round(sharePercent) === 0
		? "<1"
		: String(Math.round(sharePercent));

export type TransactionInsightsSegment = {
	id: string;
	label: string;
	amount: number;
	sharePercent: number;
	color: string;
};

export type TransactionInsightsModel = {
	cardLabel: string;
	isAllTypes: boolean;
	isExpense: boolean;
	segments: TransactionInsightsSegment[];
	centerTotal: number;
	centerCaption: string;
	shareContextLabel: string;
	emptyMessage?: string;
	isEmpty: boolean;
};

const sumAmounts = (transactions: Transaction[]) =>
	transactions.reduce((total, transaction) => total + transaction.amount, 0);

const filterByType = (
	transactions: Transaction[],
	type: typeof TRANSACTION_TYPE.EXPENSE | typeof TRANSACTION_TYPE.INCOME,
) => transactions.filter((transaction) => transaction.type === type);

const buildCategorySegments = (
	transactions: Transaction[],
	colors: readonly string[],
	otherColor: string,
): TransactionInsightsSegment[] => {
	const totalsByCategory = new Map<TransactionCategory, number>();

	// Sum transaction amounts per category.
	for (const transaction of transactions) {
		totalsByCategory.set(
			transaction.category,
			(totalsByCategory.get(transaction.category) ?? 0) + transaction.amount,
		);
	}

	// Largest categories first (for top-N chart segments).
	const sorted = [...totalsByCategory.entries()].sort(
		([, leftAmount], [, rightAmount]) => rightAmount - leftAmount,
	);

	const monthTotal = sumAmounts(transactions);
	if (monthTotal <= 0) {
		return [];
	}

	const topCategories = sorted.slice(0, MAX_CATEGORY_SEGMENTS);
	const otherAmount = sorted
		.slice(MAX_CATEGORY_SEGMENTS)
		.reduce((total, [, amount]) => total + amount, 0);

	const segments: TransactionInsightsSegment[] = topCategories.map(
		([category, amount], index) => ({
			id: category,
			label: category,
			amount,
			sharePercent: toSharePercent(amount, monthTotal),
			color: colors[index] ?? otherColor,
		}),
	);

	if (otherAmount > 0) {
		segments.push({
			id: "other",
			label: "Other",
			amount: otherAmount,
			sharePercent: toSharePercent(otherAmount, monthTotal),
			color: otherColor,
		});
	}

	return segments;
};

const buildCategoryInsights = (
	transactions: Transaction[],
	isExpense: boolean,
	cardLabel: string,
	shareContextLabel: string,
	emptyMessage: string,
): TransactionInsightsModel => {
	const isEmpty = transactions.length === 0;
	const segments = isEmpty
		? []
		: buildCategorySegments(
				transactions,
				isExpense
					? EXPENSE_CATEGORY_CHART_COLORS
					: INCOME_CATEGORY_CHART_COLORS,
				isExpense ? EXPENSE_CATEGORY_OTHER_COLOR : INCOME_CATEGORY_OTHER_COLOR,
			);

	return {
		cardLabel,
		isAllTypes: false,
		isExpense,
		segments,
		centerTotal: sumAmounts(transactions),
		centerCaption: isEmpty ? emptyMessage : "This month",
		shareContextLabel,
		emptyMessage: isEmpty ? emptyMessage : undefined,
		isEmpty,
	};
};

const buildAllTypeInsights = (
	monthTransactions: Transaction[],
): TransactionInsightsModel => {
	const expenses = filterByType(monthTransactions, TRANSACTION_TYPE.EXPENSE);
	const income = filterByType(monthTransactions, TRANSACTION_TYPE.INCOME);
	const expenseTotal = sumAmounts(expenses);
	const incomeTotal = sumAmounts(income);
	const activityTotal = expenseTotal + incomeTotal;

	const segments: TransactionInsightsSegment[] = [];

	if (expenseTotal > 0) {
		segments.push({
			id: "expenses",
			label: "Expenses",
			amount: expenseTotal,
			sharePercent: toSharePercent(expenseTotal, activityTotal),
			color: CHART_TYPE_EXPENSE_COLOR,
		});
	}

	if (incomeTotal > 0) {
		segments.push({
			id: "income",
			label: "Income",
			amount: incomeTotal,
			sharePercent: toSharePercent(incomeTotal, activityTotal),
			color: CHART_TYPE_INCOME_COLOR,
		});
	}

	const isEmpty = activityTotal <= 0;

	return {
		cardLabel: "Expenses & income",
		isAllTypes: true,
		isExpense: false,
		segments,
		centerTotal: activityTotal,
		centerCaption: "This month",
		shareContextLabel: "of activity",
		isEmpty,
	};
};

export const filterTransactionsByView = (
	transactions: Transaction[],
	filter: TransactionsViewFilter,
): Transaction[] => {
	if (filter === TRANSACTIONS_VIEW_FILTER.ALL) {
		return transactions;
	}

	if (filter === TRANSACTIONS_VIEW_FILTER.EXPENSES) {
		return filterByType(transactions, TRANSACTION_TYPE.EXPENSE);
	}

	return filterByType(transactions, TRANSACTION_TYPE.INCOME);
};

export const buildTransactionInsights = (
	monthTransactions: Transaction[],
	filter: TransactionsViewFilter,
): TransactionInsightsModel => {
	const filtered = filterTransactionsByView(monthTransactions, filter);

	if (filter === TRANSACTIONS_VIEW_FILTER.EXPENSES) {
		return buildCategoryInsights(
			filtered,
			true,
			"Category split",
			"of expenses",
			"No expenses",
		);
	}

	if (filter === TRANSACTIONS_VIEW_FILTER.INCOME) {
		return buildCategoryInsights(
			filtered,
			false,
			"Category split",
			"of income",
			"No income",
		);
	}

	return buildAllTypeInsights(monthTransactions);
};
