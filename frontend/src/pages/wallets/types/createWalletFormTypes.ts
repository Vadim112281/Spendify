import type {CurrencyType, WalletType} from "@/features/wallets/walletTypes";
import type {CreateWalletErrorCode} from "@/pages/wallets/types/walletErrorCodes";

export type CreateWalletFormValues = {
	walletName: string;
	walletType: WalletType | null;
	currencyType: CurrencyType | null;
};

export type CreateWalletFieldErrorCodes = Partial<
	Record<keyof CreateWalletFormValues, CreateWalletErrorCode>
>;

export type CreateWalletFieldErrors = Partial<
	Record<keyof CreateWalletFormValues, string>
>;
