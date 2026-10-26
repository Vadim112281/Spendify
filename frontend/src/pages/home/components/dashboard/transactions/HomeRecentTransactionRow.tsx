import {TransactionRowContent} from "@/features/transactions/components/list/TransactionRowContent";
import {
	TRANSACTION_KIND,
	type TransactionListViewItem,
} from "@/features/transactions/types/transactionListViewTypes";
import {CURRENCY_TYPE_DISPLAY} from "@/features/wallets/walletDisplayService";
import type {CurrencyType} from "@/features/wallets/walletTypes";
import {formatCurrencyAmount} from "@/shared/utils/moneyFormat";
import {twx} from "@/shared/utils/twx";

type HomeRecentTransactionRowProps = {
	transaction: TransactionListViewItem;
	currency: CurrencyType;
	onPress: () => void;
};

const buildRowAriaLabel = (
	transaction: TransactionListViewItem,
	currency: CurrencyType,
): string => {
	const isIncome = transaction.kind === TRANSACTION_KIND.INCOME;
	const signedAmount = isIncome ? transaction.amount : -transaction.amount;
	const amountLabel = formatCurrencyAmount(
		signedAmount,
		CURRENCY_TYPE_DISPLAY[currency].symbol,
		{signed: true},
	);

	return `${transaction.title}, ${amountLabel}, ${transaction.dateGroupLabel}`;
};

export const HomeRecentTransactionRow = ({
	transaction,
	currency,
	onPress,
}: HomeRecentTransactionRowProps) => (
	<li>
		<button
			type="button"
			onClick={onPress}
			className={twx(
				"w-full rounded-14 e-home-stat-surface text-left",
				"min-h-44 transition-(background,box-shadow) duration-200",
				"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-zinc",
			)}
			aria-label={buildRowAriaLabel(transaction, currency)}
		>
			<TransactionRowContent transaction={transaction} currency={currency} />
		</button>
	</li>
);
