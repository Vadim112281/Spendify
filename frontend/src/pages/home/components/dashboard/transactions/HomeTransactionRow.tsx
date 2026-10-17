import {useMemo} from "react";

import {CURRENCY_TYPE_DISPLAY} from "@/features/wallets/walletDisplayService";
import type {CurrencyType} from "@/features/wallets/walletTypes";
import {
	type HomeDashboardTransaction,
	TRANSACTION_KIND,
} from "@/pages/home/types/homeDashboardTypes";
import {TransactionCategoryIcon} from "@/shared/icons/TransactionCategoryIcon/TransactionCategoryIcon";
import {
	AppSwipeRow,
	type AppSwipeRowAction,
} from "@/shared/ui/AppSwipeRow/AppSwipeRow";
import {formatCurrencyAmount} from "@/shared/utils/moneyFormat";
import {twx} from "@/shared/utils/twx";

type HomeTransactionRowProps = {
	transaction: HomeDashboardTransaction;
	currency: CurrencyType;
	isSwipeOpen: boolean;
	onSwipeOpenChange: (open: boolean) => void;
	onEdit: () => void;
	onDelete: () => void;
};

export const HomeTransactionRow = ({
	transaction,
	currency,
	isSwipeOpen,
	onSwipeOpenChange,
	onEdit,
	onDelete,
}: HomeTransactionRowProps) => {
	const isIncome = transaction.kind === TRANSACTION_KIND.INCOME;
	const signedAmount = isIncome ? transaction.amount : -transaction.amount;

	const actions = useMemo<AppSwipeRowAction[]>(
		() => [
			{
				id: "edit",
				label: "Edit",
				tone: "neutral",
				onPress: onEdit,
			},
			{
				id: "delete",
				label: "Delete",
				tone: "destructive",
				onPress: onDelete,
			},
		],
		[onDelete, onEdit],
	);

	return (
		<li>
			<AppSwipeRow
				actions={actions}
				isOpen={isSwipeOpen}
				onOpenChange={onSwipeOpenChange}
			>
				<div className="flex items-center gap-12 px-12 py-11">
					<TransactionCategoryIcon category={transaction.category} size="md" />
					<div className="min-w-0 flex-1">
						<p className="m-0 truncate text-15 font-medium text-e-heading">
							{transaction.title}
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
			</AppSwipeRow>
		</li>
	);
};
