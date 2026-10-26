import {isTransactionInCalendarMonth} from "@/features/transactions/services/transactionCalendarMonthService";
import {
	TRANSACTION_KIND,
	type TransactionListViewItem,
} from "@/features/transactions/types/transactionListViewTypes";
import type {HomeMonthSummary} from "@/pages/home/types/homeDashboardTypes";

type HomeWalletStats = {
	balance: number;
	monthSummary: HomeMonthSummary;
};

const calculateHomeWalletStats = (
	transactions: TransactionListViewItem[],
	now: Date = new Date(),
): HomeWalletStats => {
	let balance = 0;
	let spent = 0;
	let income = 0;

	for (const transaction of transactions) {
		const isIncome = transaction.kind === TRANSACTION_KIND.INCOME;
		const inCurrentMonth = isTransactionInCalendarMonth(
			transaction.transactionDate,
			now,
		);

		if (isIncome) {
			balance += transaction.amount;
			if (inCurrentMonth) {
				income += transaction.amount;
			}
			continue;
		}

		balance -= transaction.amount;
		if (inCurrentMonth) {
			spent += transaction.amount;
		}
	}

	return {
		balance,
		monthSummary: {spent, income},
	};
};

export {calculateHomeWalletStats};
