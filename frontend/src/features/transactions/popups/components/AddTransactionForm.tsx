import {AddTransactionAmountStep} from "@/features/transactions/popups/components/amount/AddTransactionAmountStep";
import {AddTransactionDetailsStep} from "@/features/transactions/popups/components/details/AddTransactionDetailsStep";
import {AddTransactionStepPanels} from "@/features/transactions/popups/components/step/AddTransactionStepPanels";
import type {TransactionPopupFormViewModel} from "@/features/transactions/popups/types/transactionPopupFormTypes";

type AddTransactionFormProps = TransactionPopupFormViewModel & {
	formId?: string;
	lockWallet?: boolean;
};

export const AddTransactionForm = ({
	formId = "add-transaction-form",
	lockWallet = false,
	...form
}: AddTransactionFormProps) => {
	const {step, onSubmit} = form;

	return (
		<form
			id={formId}
			className="flex min-h-0 flex-1 flex-col"
			onSubmit={onSubmit}
			noValidate
		>
			<AddTransactionStepPanels
				step={step}
				amountPanel={<AddTransactionAmountStep {...form} />}
				detailsPanel={
					<AddTransactionDetailsStep
						{...form}
						formId={formId}
						lockWallet={lockWallet}
					/>
				}
			/>
		</form>
	);
};
