import type {SubmitEventHandler} from "react";

import type {
	AddTransactionFieldErrors,
	AddTransactionFormValues,
} from "@/features/transactions/popups/types/addTransactionFormTypes";
import type {AddTransactionStep} from "@/features/transactions/popups/types/addTransactionStep";
import type {Wallet} from "@/features/wallets/walletTypes";

export type TransactionPopupFormViewModel = {
	values: AddTransactionFormValues;
	fieldErrors: AddTransactionFieldErrors;
	formError?: string;
	isSubmitting: boolean;
	wallets: Wallet[];
	walletsLoading: boolean;
	walletsError?: string;
	selectedWallet?: Wallet;
	step: AddTransactionStep;
	canContinueAmount: boolean;
	goToDetails: () => void;
	goToAmount: () => void;
	setFormValue: <K extends keyof AddTransactionFormValues>(
		key: K,
		value: AddTransactionFormValues[K],
	) => void;
	appendAmountDigit: (digit: string) => void;
	backspaceAmountDigit: () => void;
	onSubmit: SubmitEventHandler<HTMLFormElement>;
};
