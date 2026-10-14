import type {SubmitEventHandler} from "react";
import {useCallback, useEffect, useRef, useState} from "react";

import {isApiError} from "@/app/api/httpClient";
import {useCreateTransactionMutation} from "@/features/transactions/transactionsQuery";
import {TRANSACTION_TYPE} from "@/features/transactions/types/transactionTypes";
import {useAddTransactionStep} from "@/pages/transactions/popup/hooks/useAddTransactionStep";
import {useAddTransactionWallets} from "@/pages/transactions/popup/hooks/useAddTransactionWallets";
import {addTransactionMessagesService} from "@/pages/transactions/popup/services/addTransactionMessagesService";
import {addTransactionPopupService} from "@/pages/transactions/popup/services/addTransactionPopupService";
import {
	type AddTransactionFieldErrors,
	type AddTransactionFormValues,
	isAddTransactionFieldErrorKey,
} from "@/pages/transactions/popup/types/addTransactionFormTypes";
import {validateAddTransactionForm} from "@/pages/transactions/popup/validation/validateAddTransactionForm";

const todayDateOnly = (): string => {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

const initialValues: AddTransactionFormValues = {
	amountInput: "0",
	type: TRANSACTION_TYPE.EXPENSE,
	category: null,
	walletId: null,
	note: "",
	transactionDate: todayDateOnly(),
};

type UseAddTransactionFormOptions = {
	open: boolean;
	onSuccess: () => void;
};

export const useAddTransactionForm = ({
	open,
	onSuccess,
}: UseAddTransactionFormOptions) => {
	const [values, setValues] = useState<AddTransactionFormValues>(initialValues);
	const [fieldErrors, setFieldErrors] = useState<AddTransactionFieldErrors>({});
	const [formError, setFormError] = useState<string | undefined>();
	const openRef = useRef(open);
	const {
		mutateAsync: createTransaction,
		reset: resetCreateTransaction,
		isPending: isCreateTransactionPending,
	} = useCreateTransactionMutation();

	const {
		wallets,
		isLoading: walletsLoading,
		error: walletsError,
	} = useAddTransactionWallets(open);

	const {step, canContinueAmount, goToDetails, goToAmount, resetStep} =
		useAddTransactionStep(values.amountInput);

	useEffect(() => {
		openRef.current = open;
		if (open) {
			setFieldErrors({});
			setFormError(undefined);
		}
	}, [open]);

	// Pre-select the first wallet when the sheet opens or wallets finish loading (walletId is null after reset).
	useEffect(() => {
		if (!open) {
			return;
		}

		const defaultWalletId = wallets[0]?.walletId;
		setValues((current) =>
			!defaultWalletId || current.walletId
				? current
				: {...current, walletId: defaultWalletId},
		);
	}, [open, wallets]);

	// Popup close does not unmount this hook — reset form and step for the next open.
	useEffect(() => {
		if (open) {
			return;
		}

		setValues({...initialValues, transactionDate: todayDateOnly()});
		setFieldErrors({});
		setFormError(undefined);
		resetStep();
		resetCreateTransaction();
	}, [open, resetStep]);

	const setFormValue = useCallback(
		<K extends keyof AddTransactionFormValues>(
			key: K,
			value: AddTransactionFormValues[K],
		) => {
			setValues((current) => ({...current, [key]: value}));
			if (isAddTransactionFieldErrorKey(key)) {
				setFieldErrors((current) => ({...current, [key]: undefined}));
			}
		},
		[],
	);

	const clearAmountInputError = useCallback(() => {
		setFieldErrors((current) =>
			current.amountInput ? {...current, amountInput: undefined} : current,
		);
	}, []);

	const appendAmountDigit = useCallback(
		(digit: string) => {
			clearAmountInputError();
			setValues((current) => ({
				...current,
				amountInput: addTransactionPopupService.appendAmountDigit(
					current.amountInput,
					digit,
				),
			}));
		},
		[clearAmountInputError],
	);

	const backspaceAmountDigit = useCallback(() => {
		clearAmountInputError();
		setValues((current) => ({
			...current,
			amountInput: addTransactionPopupService.backspaceAmountInput(
				current.amountInput,
			),
		}));
	}, [clearAmountInputError]);

	const applySubmitFieldErrors = useCallback(
		(nextFieldErrors: AddTransactionFieldErrors) => {
			setFieldErrors(nextFieldErrors);
			if (nextFieldErrors.amountInput) {
				goToAmount();
			}
		},
		[goToAmount],
	);

	const onSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		setFieldErrors({});
		setFormError(undefined);

		const clientErrorCodes = validateAddTransactionForm(values);

		if (clientErrorCodes) {
			applySubmitFieldErrors(
				addTransactionMessagesService.mapCreateTransactionClientErrors(
					clientErrorCodes,
				),
			);
			return;
		}

		const amount = addTransactionPopupService.parseAmountInput(
			values.amountInput,
		);
		if (amount === null || !values.category || !values.walletId) {
			return;
		}

		try {
			const trimmedNote = values.note.trim();
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
			if (!openRef.current) {
				return;
			}
			onSuccess();
		} catch (error) {
			if (!openRef.current) {
				return;
			}

			const apiErrors = isApiError(error)
				? addTransactionMessagesService.mapCreateTransactionApiError(error)
				: addTransactionMessagesService.getCreateTransactionUnknownError();

			applySubmitFieldErrors(apiErrors.fieldErrors);
			setFormError(apiErrors.formError);
		}
	};

	const selectedWallet = wallets.find(
		(wallet) => wallet.walletId === values.walletId,
	);

	return {
		values,
		fieldErrors,
		formError,
		isSubmitting: isCreateTransactionPending,
		wallets,
		walletsLoading,
		walletsError,
		selectedWallet,
		step,
		canContinueAmount,
		goToDetails,
		goToAmount,
		setFormValue,
		appendAmountDigit,
		backspaceAmountDigit,
		onSubmit,
	};
};
