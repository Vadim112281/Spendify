import type {SubmitEventHandler} from "react";
import {useCallback, useEffect, useRef, useState} from "react";

import {isApiError} from "@/app/api/httpClient";
import {useAddTransactionStep} from "@/features/transactions/popups/hooks/useAddTransactionStep";
import {addTransactionMessagesService} from "@/features/transactions/popups/services/addTransactionMessagesService";
import {addTransactionPopupService} from "@/features/transactions/popups/services/addTransactionPopupService";
import {
	type AddTransactionFieldErrors,
	type AddTransactionFormValues,
	isAddTransactionFieldErrorKey,
} from "@/features/transactions/popups/types/addTransactionFormTypes";
import {validateAddTransactionForm} from "@/features/transactions/popups/validation/validateAddTransactionForm";

export type TransactionFormValidatedPayload = {
	values: AddTransactionFormValues;
	amount: number;
	trimmedNote: string;
};

type UseTransactionFormStateOptions = {
	open: boolean;
	initialValues: AddTransactionFormValues;
	onSuccess: () => void;
	submitValidPayload: (
		payload: TransactionFormValidatedPayload,
	) => Promise<boolean>;
	canSubmit?: () => boolean;
	isSubmitting?: boolean;
};

export const useTransactionFormState = ({
	open,
	initialValues,
	onSuccess,
	submitValidPayload,
	canSubmit = () => true,
	isSubmitting = false,
}: UseTransactionFormStateOptions) => {
	const [values, setValues] = useState(initialValues);
	const [fieldErrors, setFieldErrors] = useState<AddTransactionFieldErrors>({});
	const [formError, setFormError] = useState<string | undefined>();
	const openRef = useRef(open);

	const {step, canContinueAmount, goToDetails, goToAmount, resetStep} =
		useAddTransactionStep(values.amountInput);

	useEffect(() => {
		openRef.current = open;
		if (open) {
			setFieldErrors({});
			setFormError(undefined);
		}
	}, [open]);

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

	const clearFormErrors = useCallback(() => {
		setFieldErrors({});
		setFormError(undefined);
	}, []);

	const onSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		clearFormErrors();

		if (!canSubmit() || isSubmitting) {
			return;
		}

		const clientErrorCodes = validateAddTransactionForm(values);

		if (clientErrorCodes) {
			applySubmitFieldErrors(
				addTransactionMessagesService.mapTransactionClientErrors(
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

		const trimmedNote = values.note.trim();

		try {
			const didPersist = await submitValidPayload({
				values,
				amount,
				trimmedNote,
			});
			if (!didPersist || !openRef.current) {
				return;
			}
			onSuccess();
		} catch (error) {
			if (!openRef.current) {
				return;
			}

			const apiErrors = isApiError(error)
				? addTransactionMessagesService.mapTransactionApiError(error)
				: addTransactionMessagesService.getTransactionUnknownError();

			applySubmitFieldErrors(apiErrors.fieldErrors);
			setFormError(apiErrors.formError);
		}
	};

	return {
		values,
		setValues,
		fieldErrors,
		formError,
		openRef,
		step,
		canContinueAmount,
		goToDetails,
		goToAmount,
		resetStep,
		clearFormErrors,
		setFormValue,
		appendAmountDigit,
		backspaceAmountDigit,
		applySubmitFieldErrors,
		onSubmit,
	};
};
