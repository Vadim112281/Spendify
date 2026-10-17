import {
	skipToken,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

import {
	createTransaction,
	deleteTransaction,
	updateTransaction,
} from "@/features/transactions/api/transactionsApi";
import {fetchAllWalletTransactions} from "@/features/transactions/services/fetchAllWalletTransactions";
import type {
	CreateTransactionRequest,
	Transaction,
	UpdateTransactionRequest,
} from "@/features/transactions/types/transactionTypes";

const walletTransactionsQueryKey = (walletId: string) =>
	["transactions", walletId] as const;

const disabledWalletTransactionsQueryKey = [
	"transactions",
	"__none__",
] as const;

type CreateTransactionVariables = {
	walletId: string;
	body: CreateTransactionRequest;
};

type UpdateTransactionVariables = {
	walletId: string;
	transactionId: string;
	body: UpdateTransactionRequest;
};

type DeleteTransactionVariables = {
	walletId: string;
	transactionId: string;
};

const invalidateWalletTransactions = (
	queryClient: ReturnType<typeof useQueryClient>,
	walletId: string,
) => {
	void queryClient.invalidateQueries({
		queryKey: walletTransactionsQueryKey(walletId),
	});
};

export const useCreateTransactionMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({walletId, body}: CreateTransactionVariables) =>
			createTransaction(walletId, body),
		onSuccess: (_transaction, {walletId}) => {
			invalidateWalletTransactions(queryClient, walletId);
		},
	});
};

export const useUpdateTransactionMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({walletId, transactionId, body}: UpdateTransactionVariables) =>
			updateTransaction(walletId, transactionId, body),
		onSuccess: (_transaction, {walletId}) => {
			invalidateWalletTransactions(queryClient, walletId);
		},
	});
};

export const useDeleteTransactionMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({walletId, transactionId}: DeleteTransactionVariables) =>
			deleteTransaction(walletId, transactionId),
		onSuccess: (_result, {walletId}) => {
			invalidateWalletTransactions(queryClient, walletId);
		},
	});
};

export const useWalletTransactionsQuery = (walletId: string | undefined) => {
	const query = useQuery({
		queryKey: walletId
			? walletTransactionsQueryKey(walletId)
			: disabledWalletTransactionsQueryKey,
		queryFn: walletId
			? (): Promise<Transaction[]> => fetchAllWalletTransactions(walletId)
			: skipToken,
	});

	const isEnabled = Boolean(walletId);

	return {
		transactions: query.data ?? [],
		isLoading: isEnabled && query.isLoading,
		isFetching: isEnabled && query.isFetching,
		isError: query.isError,
		refetch: query.refetch,
	};
};
