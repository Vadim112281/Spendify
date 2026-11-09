import {CategoryIcon} from "@/features/categories/components/CategoryIcon";
import {resolveCategoryIconKey} from "@/features/categories/services/categoryDisplayService";
import type {UserCategory} from "@/features/categories/types/categoryTypes";
import {resolveTransactionRowTitle} from "@/features/transactions/services/transactionCategoryDisplayService";
import {
	TRANSACTION_KIND,
	type TransactionListViewItem,
} from "@/features/transactions/types/transactionListViewTypes";
import {CURRENCY_TYPE_DISPLAY} from "@/features/wallets/walletDisplayService";
import type {CurrencyType} from "@/features/wallets/walletTypes";
import {formatCurrencyAmount} from "@/shared/utils/moneyFormat";
import {twx} from "@/shared/utils/twx";

type TransactionRowContentProps = {
	transaction: TransactionListViewItem;
	currency: CurrencyType;
	categories: UserCategory[];
};

export const TransactionRowContent = ({
	transaction,
	currency,
	categories,
}: TransactionRowContentProps) => {
	const isIncome = transaction.kind === TRANSACTION_KIND.INCOME;
	const signedAmount = isIncome ? transaction.amount : -transaction.amount;
	const iconKey = resolveCategoryIconKey(categories, transaction.category);
	const rowTitle = resolveTransactionRowTitle(categories, transaction);

	return (
		<div className="flex items-center gap-12 px-12 py-11">
			<CategoryIcon iconKey={iconKey} size="md" />
			<div className="min-w-0 flex-1">
				<p className="m-0 truncate text-15 font-medium text-e-heading">
					{rowTitle}
				</p>
			</div>
			<p
				className={twx(
					"m-0 shrink-0 text-end font-mono text-13 font-semibold tabular-nums tracking-tight-03",
					"rounded-full px-9 py-5",
					isIncome
						? "bg-e-positive/12 text-e-positive"
						: "bg-e-error/12 text-e-error",
				)}
			>
				{formatCurrencyAmount(
					signedAmount,
					CURRENCY_TYPE_DISPLAY[currency].symbol,
					{signed: true},
				)}
			</p>
		</div>
	);
};
