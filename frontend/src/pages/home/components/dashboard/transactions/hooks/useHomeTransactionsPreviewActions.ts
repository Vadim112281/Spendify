import {useCallback, useState} from "react";
import {addTransactionMessagesService} from "@/features/transactions/popups/services/addTransactionMessagesService";
import type {EditTransactionTarget} from "@/features/transactions/popups/types/editTransactionTypes";
import {useDeleteTransactionMutation} from "@/features/transactions/transactionsQuery";
import {mapHomeTransactionToEditTarget} from "@/pages/home/services/homeDashboardTransactionsService";
import type {HomeDashboardTransaction} from "@/pages/home/types/homeDashboardTypes";

export const useHomeTransactionsPreviewActions = (walletId: string) => {
	const [openSwipeId, setOpenSwipeId] = useState<string | null>(null);
	const [editTarget, setEditTarget] = useState<EditTransactionTarget | null>(
		null,
	);
	const [deleteTarget, setDeleteTarget] =
		useState<HomeDashboardTransaction | null>(null);
	const [deleteError, setDeleteError] = useState<string | undefined>();
	const {mutate: deleteTransaction, isPending: isDeletePending} =
		useDeleteTransactionMutation();

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
			setDeleteTarget(transaction);
		},
		[],
	);

	const closeDeleteConfirm = useCallback(() => {
		setDeleteTarget(null);
		setDeleteError(undefined);
	}, []);

	const handleDeleteOpenChange = useCallback(
		(open: boolean) => {
			if (!open) {
				if (isDeletePending) {
					return;
				}
				closeDeleteConfirm();
			}
		},
		[closeDeleteConfirm, isDeletePending],
	);

	const handleConfirmDelete = useCallback(() => {
		if (!deleteTarget) {
			return;
		}

		setDeleteError(undefined);
		deleteTransaction(
			{
				walletId,
				transactionId: deleteTarget.id,
			},
			{
				onSuccess: () => {
					setDeleteTarget(null);
				},
				onError: (error) => {
					setDeleteError(
						addTransactionMessagesService.mapDeleteTransactionError(error),
					);
				},
			},
		);
	}, [deleteTarget, deleteTransaction, walletId]);

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
		editConfirmOpen: editTarget !== null,
		editTarget,
		handleEditOpenChange,
		deleteConfirmOpen: deleteTarget !== null,
		deleteError,
		isDeletePending,
		handleDeleteOpenChange,
		handleConfirmDelete,
	};
};
