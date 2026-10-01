import type {CurrencyType} from "@/features/wallets/walletTypes";
import {HomeActivityCategoryIcon} from "@/pages/home/components/dashboard/icons/HomeActivityCategoryIcon";
import {formatHomeMoney} from "@/pages/home/services/homeMoneyService";
import {
	type HomeDashboardTransaction,
	TRANSACTION_KIND,
} from "@/pages/home/types/homeDashboardTypes";
import {twx} from "@/shared/utils/twx";

type HomeTransactionRowProps = {
	transaction: HomeDashboardTransaction;
	currency: CurrencyType;
};

export const HomeTransactionRow = ({
	transaction,
	currency,
}: HomeTransactionRowProps) => {
	const isIncome = transaction.kind === TRANSACTION_KIND.INCOME;
	const signedAmount = isIncome ? transaction.amount : -transaction.amount;

	return (
		<li className="flex items-center gap-12 py-12">
			<HomeActivityCategoryIcon category={transaction.category} />
			<div className="min-w-0 flex-1">
				<p className="m-0 truncate text-15 font-medium text-e-heading">
					{transaction.title}
				</p>
				<p className="m-0 mt-2 text-12 text-e-zinc/85">
					{transaction.occurredLabel}
				</p>
			</div>
			<p
				className={twx(
					"m-0 shrink-0 rounded-full px-10 py-6 text-14 font-semibold tabular-nums tracking-tight-03",
					isIncome
						? "bg-e-positive/14 text-e-positive"
						: "bg-e-error/14 text-e-error",
				)}
			>
				{formatHomeMoney(signedAmount, currency, {
					signed: true,
				})}
			</p>
		</li>
	);
};
