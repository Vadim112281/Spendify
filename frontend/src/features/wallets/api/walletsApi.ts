import {httpClient} from "@/app/api/httpClient";
import type {CreateWalletRequest, Wallet} from "@/features/wallets/walletTypes";

export const getUserWallets = (): Promise<Wallet[]> =>
	httpClient<Wallet[]>("/wallets");

export const createWallet = (body: CreateWalletRequest): Promise<Wallet> =>
	httpClient<Wallet>("/wallets", {
		method: "POST",
		body: JSON.stringify(body),
	});
