import {getWalletTransactions} from "@/features/transactions/api/transactionsApi";
import type {Transaction} from "@/features/transactions/types/transactionTypes";

// TODO: Home loads every page into memory; replace with paginated or infinite fetch when wallets grow large.
export const fetchAllWalletTransactions = async (
	walletId: string,
): Promise<Transaction[]> => {
	const firstPage = await getWalletTransactions(walletId);
	const items = [...firstPage.items];

	if (firstPage.totalCount <= items.length) {
		return items;
	}

	let page = 2;

	while (items.length < firstPage.totalCount) {
		const nextPage = await getWalletTransactions(walletId, page);
		items.push(...nextPage.items);

		if (nextPage.items.length === 0) {
			break;
		}

		page += 1;
	}

	return items;
};
