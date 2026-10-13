import {httpClient} from "@/app/api/httpClient";
import type {
	CreateTransactionRequest,
	Transaction,
} from "@/pages/transactions/types/transactionTypes";

export const createTransaction = (
	walletId: string,
	body: CreateTransactionRequest,
): Promise<Transaction> =>
	httpClient<Transaction>(`/wallets/${walletId}/transactions`, {
		method: "POST",
		body: JSON.stringify(body),
	});
