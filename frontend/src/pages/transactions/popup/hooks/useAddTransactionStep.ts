import {useCallback, useState} from "react";

import {
	ADD_TRANSACTION_STEP,
	type AddTransactionStep,
} from "@/pages/transactions/popup/types/addTransactionStep";
import {addTransactionPopupService} from "@/pages/transactions/popup/services/addTransactionPopupService";

export const useAddTransactionStep = (amountInput: string) => {
	const [step, setStep] = useState<AddTransactionStep>(
		ADD_TRANSACTION_STEP.AMOUNT,
	);

	const canContinueAmount =
		addTransactionPopupService.isValidAmountInput(amountInput);

	const goToDetails = useCallback(() => {
		if (!canContinueAmount) {
			return;
		}

		setStep(ADD_TRANSACTION_STEP.DETAILS);
	}, [canContinueAmount]);

	const goToAmount = useCallback(() => {
		setStep(ADD_TRANSACTION_STEP.AMOUNT);
	}, []);

	const resetStep = useCallback(() => {
		setStep(ADD_TRANSACTION_STEP.AMOUNT);
	}, []);

	return {
		step,
		canContinueAmount,
		goToDetails,
		goToAmount,
		resetStep,
	};
};
