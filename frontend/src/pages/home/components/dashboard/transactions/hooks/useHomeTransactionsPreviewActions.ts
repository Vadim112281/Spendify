import {useCallback, useState} from "react";
import {isApiError} from "@/app/api/httpClient";
import {addTransactionMessagesService} from "@/features/transactions/popups/services/addTransactionMessagesService";
import type {EditTransactionTarget} from "@/features/transactions/popups/types/editTransactionTypes";
import {useDeleteTransactionMutation} from "@/features/transactions/transactionsQuery";
import {mapHomeTransactionToEditTarget} from "@/pages/home/services/homeDashboardTransactionsService";
import type {HomeDashboardTransaction} from "@/pages/home/types/homeDashboardTypes";

const DELETE_TRANSACTION_ERROR_MESSAGE =
	"Could not delete this transaction. Please try again.";

export const useHomeTransactionsPreviewActions = (walletId: string) => {
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
		(transaction: HomeDashboardTransaction) => {
			setOpenSwipeId(null);
			setEditTarget(mapHomeTransactionToEditTarget(walletId, transaction));
		},
		[walletId],
	);

	const handleDeleteTransaction = useCallback(
		(transaction: HomeDashboardTransaction) => {
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
