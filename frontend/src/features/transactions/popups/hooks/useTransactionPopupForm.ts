import {useCallback, useEffect, useMemo, useRef} from "react";

import {useAddTransactionWallets} from "@/features/transactions/popups/hooks/useAddTransactionWallets";
import {
	type TransactionFormValidatedPayload,
	useTransactionFormState,
} from "@/features/transactions/popups/hooks/useTransactionFormState";
import {addTransactionPopupService} from "@/features/transactions/popups/services/addTransactionPopupService";
import type {AddTransactionFormValues} from "@/features/transactions/popups/types/addTransactionFormTypes";
import type {EditTransactionTarget} from "@/features/transactions/popups/types/editTransactionTypes";
import type {TransactionPopupFormViewModel} from "@/features/transactions/popups/types/transactionPopupFormTypes";
import {
	useCreateTransactionMutation,
	useUpdateTransactionMutation,
} from "@/features/transactions/transactionsQuery";
import {TRANSACTION_TYPE} from "@/features/transactions/types/transactionTypes";
import type {Wallet} from "@/features/wallets/walletTypes";

const todayDateOnly = (): string => {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

const addInitialValues = (): AddTransactionFormValues => ({
	amountInput: "0",
	type: TRANSACTION_TYPE.EXPENSE,
	category: null,
	walletId: null,
	note: "",
	transactionDate: todayDateOnly(),
});

const emptyEditTarget = (): EditTransactionTarget => ({
	transactionId: "",
	walletId: "",
	type: TRANSACTION_TYPE.EXPENSE,
	category: null,
	amount: 0,
	note: "",
	transactionDate: "",
});

const valuesFromTarget = (
	target: EditTransactionTarget,
): AddTransactionFormValues => ({
	amountInput: addTransactionPopupService.formatAmountInputFromNumber(
		target.amount,
	),
	type: target.type,
	category: target.category,
	walletId: target.walletId,
	note: target.note,
	transactionDate: target.transactionDate,
});

type UseTransactionPopupFormAddOptions = {
	mode: "add";
	open: boolean;
	onSuccess: () => void;
};

type UseTransactionPopupFormEditOptions = {
	mode: "edit";
	open: boolean;
	target: EditTransactionTarget | null;
	lockedWallet: Wallet | null;
	onSuccess: () => void;
};

type UseTransactionPopupFormOptions =
	| UseTransactionPopupFormAddOptions
	| UseTransactionPopupFormEditOptions;

export const useTransactionPopupForm = (
	options: UseTransactionPopupFormOptions,
): TransactionPopupFormViewModel => {
	const isAdd = options.mode === "add";
	const {open, onSuccess} = options;

	const editTarget = isAdd ? null : options.target;
	const lockedWallet = isAdd ? null : options.lockedWallet;

	const targetRef = useRef(editTarget);
	targetRef.current = editTarget;

	const {
		mutateAsync: createTransaction,
		reset: resetCreateTransaction,
		isPending: isCreateTransactionPending,
	} = useCreateTransactionMutation();

	const {
		mutateAsync: updateTransaction,
		reset: resetUpdateTransaction,
		isPending: isUpdateTransactionPending,
	} = useUpdateTransactionMutation();

	const walletsEnabled = open && (isAdd || !lockedWallet);
	const {
		wallets: fetchedWallets,
		isLoading: fetchedWalletsLoading,
		error: fetchedWalletsError,
	} = useAddTransactionWallets(walletsEnabled);

	const wallets = useMemo(() => {
		if (isAdd) {
			return fetchedWallets;
		}

		if (lockedWallet) {
			return [lockedWallet];
		}

		return fetchedWallets;
	}, [fetchedWallets, isAdd, lockedWallet]);
	const walletsLoading = isAdd
		? fetchedWalletsLoading
		: lockedWallet
			? false
			: fetchedWalletsLoading;
	const walletsError = isAdd
		? fetchedWalletsError
		: lockedWallet
			? undefined
			: fetchedWalletsError;

	const submitValidPayload = useCallback(
		async ({values, amount, trimmedNote}: TransactionFormValidatedPayload) => {
			if (isAdd) {
				if (!values.walletId || !values.category) {
					return false;
				}

				await createTransaction({
					walletId: values.walletId,
					body: {
						type: values.type,
						category: values.category,
						amount,
						transactionDate: values.transactionDate,
						...(trimmedNote ? {note: trimmedNote} : {}),
					},
				});
				return true;
			}

			const target = targetRef.current;
			if (!target || !values.category) {
				return false;
			}

			await updateTransaction({
				walletId: target.walletId,
				transactionId: target.transactionId,
				body: {
					type: values.type,
					category: values.category,
					amount,
					transactionDate: values.transactionDate,
					note: trimmedNote,
				},
			});
			return true;
		},
		[createTransaction, isAdd, updateTransaction],
	);

	const canSubmit = useCallback(
		() => isAdd || Boolean(targetRef.current),
		[isAdd],
	);

	const form = useTransactionFormState({
		open,
		initialValues: isAdd
			? addInitialValues()
			: valuesFromTarget(editTarget ?? emptyEditTarget()),
		onSuccess,
		submitValidPayload,
		canSubmit,
	});

	const {values, setValues, resetStep, clearFormErrors} = form;

	useEffect(() => {
		if (!isAdd || !open) {
			return;
		}

		const defaultWalletId = fetchedWallets[0]?.walletId;
		setValues((current) =>
			!defaultWalletId || current.walletId
				? current
				: {...current, walletId: defaultWalletId},
		);
	}, [fetchedWallets, isAdd, open, setValues]);

	useEffect(() => {
		if (isAdd || !open || !editTarget) {
			return;
		}

		setValues(valuesFromTarget(editTarget));
		clearFormErrors();
		resetStep();
	}, [clearFormErrors, editTarget, isAdd, open, resetStep, setValues]);

	useEffect(() => {
		if (open) {
			return;
		}

		if (isAdd) {
			setValues(addInitialValues());
		}

		clearFormErrors();
		resetStep();

		if (isAdd) {
			resetCreateTransaction();
		} else {
			resetUpdateTransaction();
		}
	}, [
		clearFormErrors,
		isAdd,
		open,
		resetCreateTransaction,
		resetStep,
		resetUpdateTransaction,
		setValues,
	]);

	const selectedWallet = wallets.find(
		(wallet) => wallet.walletId === values.walletId,
	);

	return {
		values: form.values,
		fieldErrors: form.fieldErrors,
		formError: form.formError,
		isSubmitting: isAdd
			? isCreateTransactionPending
			: isUpdateTransactionPending,
		wallets,
		walletsLoading,
		walletsError,
		selectedWallet,
		step: form.step,
		canContinueAmount: form.canContinueAmount,
		goToDetails: form.goToDetails,
		goToAmount: form.goToAmount,
		setFormValue: form.setFormValue,
		appendAmountDigit: form.appendAmountDigit,
		backspaceAmountDigit: form.backspaceAmountDigit,
		onSubmit: form.onSubmit,
	};
};
