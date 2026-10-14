import {
	skipToken,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

import {createTransaction} from "@/features/transactions/api/transactionsApi";
import {fetchAllWalletTransactions} from "@/features/transactions/services/fetchAllWalletTransactions";
import type {
	CreateTransactionRequest,
	Transaction,
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

export const useCreateTransactionMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({walletId, body}: CreateTransactionVariables) =>
			createTransaction(walletId, body),
		onSuccess: (_transaction, {walletId}) => {
			void queryClient.invalidateQueries({
				queryKey: walletTransactionsQueryKey(walletId),
			});
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
