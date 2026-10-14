import {
	type HomeDashboardTransaction,
	type HomeMonthSummary,
	TRANSACTION_KIND,
} from "@/pages/home/types/homeDashboardTypes";
import {parseCalendarTransactionDate} from "@/shared/utils/timeUtils";

type HomeWalletStats = {
	balance: number;
	monthSummary: HomeMonthSummary;
};

const isInCurrentCalendarMonth = (
	transactionDate: string,
	now: Date,
): boolean => {
	const date = parseCalendarTransactionDate(transactionDate);
	return (
		date.getFullYear() === now.getFullYear() &&
		date.getMonth() === now.getMonth()
	);
};

const calculateHomeWalletStats = (
	transactions: HomeDashboardTransaction[],
	now: Date = new Date(),
): HomeWalletStats => {
	let balance = 0;
	let spent = 0;
	let income = 0;

	for (const transaction of transactions) {
		const isIncome = transaction.kind === TRANSACTION_KIND.INCOME;
		const inCurrentMonth = isInCurrentCalendarMonth(
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
