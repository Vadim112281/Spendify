import {useCallback, useState} from "react";
import {isApiError} from "@/app/api/httpClient";
import {addTransactionMessagesService} from "@/features/transactions/popups/services/addTransactionMessagesService";
import type {EditTransactionTarget} from "@/features/transactions/popups/types/editTransactionTypes";
import {useDeleteTransactionMutation} from "@/features/transactions/transactionsQuery";
import type {TransactionListActionTarget} from "@/features/transactions/types/transactionListActionsTypes";

const DELETE_TRANSACTION_ERROR_MESSAGE =
	"Could not delete this transaction. Please try again.";

const toEditTransactionTarget = (
	walletId: string,
	item: TransactionListActionTarget,
): EditTransactionTarget => ({
	transactionId: item.id,
	walletId,
	type: item.type,
	category: item.category,
	amount: item.amount,
	note: item.note,
	transactionDate: item.transactionDate,
});

export const useTransactionListActions = (walletId: string) => {
	const [openSwipeId, setOpenSwipeId] = useState<string | null>(null);
	const [editTarget, setEditTarget] = useState<EditTransactionTarget | null>(
		null,
	);
	const [deleteError, setDeleteError] = useState<string | undefined>();

	const {mutate: deleteTransaction} = useDeleteTransactionMutation();

	const handleSwipeOpenChange = useCallback(
		(transactionId: string, open: boolean) => {
			setOpenSwipeId(open ? transactionId : null);
		},
		[],
	);

	const handleEditTransaction = useCallback(
		(transaction: TransactionListActionTarget) => {
			setOpenSwipeId(null);
			setEditTarget(toEditTransactionTarget(walletId, transaction));
		},
		[walletId],
	);

	const handleDeleteTransaction = useCallback(
		(transaction: TransactionListActionTarget) => {
			setOpenSwipeId(null);
			setDeleteError(undefined);
			deleteTransaction(
				{
					walletId,
					transactionId: transaction.id,
				},
				{
					onError: (error) => {
						const mapped = isApiError(error)
							? addTransactionMessagesService.mapTransactionApiError(error)
							: addTransactionMessagesService.getTransactionUnknownError();
						setDeleteError(
							mapped.formError ?? DELETE_TRANSACTION_ERROR_MESSAGE,
						);
					},
				},
			);
		},
		[deleteTransaction, walletId],
	);

	const handleEditOpenChange = useCallback((open: boolean) => {
		if (!open) {
			setEditTarget(null);
		}
	}, []);

	return {
		openSwipeId,
		handleSwipeOpenChange,
		handleEditTransaction,
		handleDeleteTransaction,
		deleteError,
		editOpen: editTarget !== null,
		editTarget,
		handleEditOpenChange,
	};
};
