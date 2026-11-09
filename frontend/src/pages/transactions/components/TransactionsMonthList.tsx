import {useMemo} from "react";
import type {UserCategory} from "@/features/categories/types/categoryTypes";
import {TransactionsDateGroup} from "@/features/transactions/components/list/TransactionsDateGroup";
import {useTransactionListActions} from "@/features/transactions/hooks/useTransactionListActions";
import {EditTransactionPopup} from "@/features/transactions/popups/EditTransactionPopup";
import {
	groupTransactionsByDate,
	mapListViewToListActionTarget,
	mapTransactionToListView,
} from "@/features/transactions/services/transactionListViewService";
import type {Transaction} from "@/features/transactions/types/transactionTypes";
import type {Wallet} from "@/features/wallets/walletTypes";
import {AppFormError} from "@/shared/ui/AppFormError/AppFormError";

type TransactionsMonthListProps = {
	wallet: Wallet;
	transactions: Transaction[];
	categories: UserCategory[];
	focusTransactionId?: string | null;
};

export const TransactionsMonthList = ({
	wallet,
	transactions,
	categories,
	focusTransactionId = null,
}: TransactionsMonthListProps) => {
	const listViewTransactions = useMemo(
		() => transactions.map(mapTransactionToListView),
		[transactions],
	);

	const groups = useMemo(
		() => groupTransactionsByDate(listViewTransactions),
		[listViewTransactions],
	);

	const hideGroupLabels = groups.length === 1;

	const {
		openSwipeId,
		handleSwipeOpenChange,
		handleEditTransaction,
		handleDeleteTransaction,
		deleteError,
		editOpen,
		editTarget,
		handleEditOpenChange,
	} = useTransactionListActions(wallet.walletId);

	return (
		<>
			{deleteError ? (
				<div className="mb-12">
					<AppFormError message={deleteError} />
				</div>
			) : null}
			{groups.map((group, index) => (
				<TransactionsDateGroup
					key={group.dateKey}
					group={group}
					currency={wallet.currencyType}
					categories={categories}
					isFirst={index === 0}
					showGroupLabel={!hideGroupLabels}
					openSwipeId={openSwipeId}
					onSwipeOpenChange={handleSwipeOpenChange}
					onEditTransaction={(transaction) => {
						handleEditTransaction(mapListViewToListActionTarget(transaction));
					}}
					onDeleteTransaction={(transaction) => {
						handleDeleteTransaction(mapListViewToListActionTarget(transaction));
					}}
					focusTransactionId={focusTransactionId}
				/>
			))}

			<EditTransactionPopup
				open={editOpen}
				target={editTarget}
				lockedWallet={wallet}
				onOpenChange={handleEditOpenChange}
			/>
		</>
	);
};
