import {httpClient} from "@/app/api/httpClient";
import type {PagedResult} from "@/app/api/pagedResult";
import type {
	CreateTransactionRequest,
	Transaction,
	UpdateTransactionRequest,
} from "@/features/transactions/types/transactionTypes";

const WALLET_TRANSACTIONS_MAX_PAGE_SIZE = 20;

export const getWalletTransactions = (
	walletId: string,
	page = 1,
	pageSize = WALLET_TRANSACTIONS_MAX_PAGE_SIZE,
): Promise<PagedResult<Transaction>> => {
	const params = new URLSearchParams({
		page: String(page),
		pageSize: String(pageSize),
	});

	return httpClient<PagedResult<Transaction>>(
		`/wallets/${walletId}/transactions?${params.toString()}`,
	);
};

export const createTransaction = (
	walletId: string,
	body: CreateTransactionRequest,
): Promise<Transaction> =>
	httpClient<Transaction>(`/wallets/${walletId}/transactions`, {
		method: "POST",
		body: JSON.stringify(body),
	});

export const updateTransaction = (
	walletId: string,
	transactionId: string,
	body: UpdateTransactionRequest,
): Promise<Transaction> =>
	httpClient<Transaction>(
		`/wallets/${walletId}/transactions/${transactionId}`,
		{
			method: "PATCH",
			body: JSON.stringify(body),
		},
	);

export const deleteTransaction = (
	walletId: string,
	transactionId: string,
): Promise<void> =>
	httpClient<void>(`/wallets/${walletId}/transactions/${transactionId}`, {
		method: "DELETE",
	});
