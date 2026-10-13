import {TRANSACTION_TYPE} from "@/pages/transactions/types/transactionTypes";
import {CURRENCY_TYPE} from "@/features/wallets/walletTypes";
import {AddTransactionAmountField} from "@/pages/transactions/popup/components/amount/AddTransactionAmountField";
import {AddTransactionAmountKeypad} from "@/pages/transactions/popup/components/amount/AddTransactionAmountKeypad";
import {TransactionTypeSwitcher} from "@/pages/transactions/popup/components/amount/TransactionTypeSwitcher";
import {AddTransactionDetailsStep} from "@/pages/transactions/popup/components/details/AddTransactionDetailsStep";
import {AddTransactionStepPanels} from "@/pages/transactions/popup/components/step/AddTransactionStepPanels";
import type {useAddTransactionForm} from "@/pages/transactions/popup/hooks/useAddTransactionForm";
import {ADD_TRANSACTION_FORM_FIELD} from "@/pages/transactions/popup/types/addTransactionFormTypes";
import {AppButton} from "@/shared/ui/AppButton/AppButton";
import {AppFormError} from "@/shared/ui/AppFormError/AppFormError";

type AddTransactionFormProps = ReturnType<typeof useAddTransactionForm>;

export const AddTransactionForm = (form: AddTransactionFormProps) => {
	const {
		selectedWallet,
		values,
		fieldErrors,
		setFormValue,
		step,
		appendAmountDigit,
		backspaceAmountDigit,
		canContinueAmount,
		goToDetails,
		onSubmit,
	} = form;

	const currency = selectedWallet?.currencyType ?? CURRENCY_TYPE.USD;
	const typeLabel =
		values.type === TRANSACTION_TYPE.INCOME ? "Income" : "Expense";

	return (
		<form
			id="add-transaction-form"
			className="flex min-h-0 flex-1 flex-col"
			onSubmit={onSubmit}
			noValidate
		>
			<AddTransactionStepPanels
				step={step}
				amountPanel={
					<div className="flex min-h-0 flex-1 flex-col px-20 pt-16 pb-16">
						<TransactionTypeSwitcher
							value={values.type}
							onChange={(type) =>
								setFormValue(ADD_TRANSACTION_FORM_FIELD.TYPE, type)
							}
						/>

						<div className="mt-16 flex min-h-0 flex-1 flex-col">
							<div className="flex flex-1 items-center justify-center py-8">
								<AddTransactionAmountField
									amountInput={values.amountInput}
									currency={currency}
									typeLabel={typeLabel}
								/>
							</div>

							<div className="shrink-0">
								{fieldErrors.amountInput ? (
									<div className="mb-12">
										<AppFormError message={fieldErrors.amountInput} />
									</div>
								) : null}
								<AddTransactionAmountKeypad
									onDigit={appendAmountDigit}
									onBackspace={backspaceAmountDigit}
								/>
								<AppButton
									type="button"
									className="mt-14"
									disabled={!canContinueAmount}
									onClick={goToDetails}
								>
									Continue
								</AppButton>
							</div>
						</div>
					</div>
				}
				detailsPanel={<AddTransactionDetailsStep {...form} />}
			/>
		</form>
	);
};
