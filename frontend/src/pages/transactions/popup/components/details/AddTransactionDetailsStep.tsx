import {TRANSACTION_TYPE} from "@/features/transactions/types/transactionTypes";
import {walletDisplayService} from "@/features/wallets/walletDisplayService";
import {CURRENCY_TYPE} from "@/features/wallets/walletTypes";
import {AddTransactionDetailsGroup} from "@/pages/transactions/popup/components/details/AddTransactionDetailsGroup";
import {AddTransactionDetailsSummary} from "@/pages/transactions/popup/components/details/AddTransactionDetailsSummary";
import {AddTransactionWalletPicker} from "@/pages/transactions/popup/components/details/AddTransactionWalletPicker";
import {TransactionCategoryPicker} from "@/pages/transactions/popup/components/details/TransactionCategoryPicker";
import type {useAddTransactionForm} from "@/pages/transactions/popup/hooks/useAddTransactionForm";
import {ADD_TRANSACTION_FORM_FIELD} from "@/pages/transactions/popup/types/addTransactionFormTypes";
import {AppButton} from "@/shared/ui/AppButton/AppButton";
import {AppFormError} from "@/shared/ui/AppFormError/AppFormError";
import {AppTextButton} from "@/shared/ui/AppTextButton/AppTextButton";
import {twx} from "@/shared/utils/twx";

type AddTransactionDetailsStepProps = Pick<
	ReturnType<typeof useAddTransactionForm>,
	| "values"
	| "fieldErrors"
	| "formError"
	| "isSubmitting"
	| "wallets"
	| "walletsLoading"
	| "walletsError"
	| "selectedWallet"
	| "setFormValue"
	| "goToAmount"
	| "onSubmit"
>;

export const AddTransactionDetailsStep = (
	form: AddTransactionDetailsStepProps,
) => {
	const currency = form.selectedWallet?.currencyType ?? CURRENCY_TYPE.USD;
	const typeLabel =
		form.values.type === TRANSACTION_TYPE.INCOME ? "Income" : "Expense";
	const showWalletPicker = form.wallets.length > 1;

	return (
		<div className="flex min-h-0 flex-1 flex-col">
			<div
				className={twx(
					"flex min-h-0 flex-1 flex-col gap-12 overflow-y-auto px-20 pt-12 pb-12",
					"scrollbar-hidden overscroll-y-contain",
				)}
			>
				<AddTransactionDetailsSummary
					amountInput={form.values.amountInput}
					currency={currency}
					typeLabel={typeLabel}
					walletLabel={
						!showWalletPicker && form.selectedWallet
							? walletDisplayService.getWalletDisplayName(
									form.selectedWallet.walletName,
									form.selectedWallet.walletType,
								)
							: undefined
					}
				/>

				{form.walletsError ? (
					<AppFormError message={form.walletsError} />
				) : null}

				{form.walletsLoading ? (
					<p className="m-0 text-14 text-e-muted">Loading wallets…</p>
				) : (
					<>
						{showWalletPicker ? (
							<AddTransactionWalletPicker
								wallets={form.wallets}
								value={form.values.walletId}
								onChange={(walletId) =>
									form.setFormValue(
										ADD_TRANSACTION_FORM_FIELD.WALLET_ID,
										walletId,
									)
								}
								error={form.fieldErrors.walletId}
							/>
						) : null}

						<TransactionCategoryPicker
							value={form.values.category}
							onChange={(category) =>
								form.setFormValue(ADD_TRANSACTION_FORM_FIELD.CATEGORY, category)
							}
							error={form.fieldErrors.category}
						/>

						<AddTransactionDetailsGroup
							compact
							note={form.values.note}
							transactionDate={form.values.transactionDate}
							onNoteChange={(note) =>
								form.setFormValue(ADD_TRANSACTION_FORM_FIELD.NOTE, note)
							}
							onDateChange={(date) =>
								form.setFormValue(
									ADD_TRANSACTION_FORM_FIELD.TRANSACTION_DATE,
									date,
								)
							}
							noteError={form.fieldErrors.note}
							dateError={form.fieldErrors.transactionDate}
						/>
					</>
				)}

				{form.formError ? <AppFormError message={form.formError} /> : null}
			</div>

			<div
				className={twx(
					"shrink-0 border-t border-white/8 bg-e-bg px-20 pt-12",
					"pb-inset-bottom-tab",
				)}
			>
				<AppButton
					type="submit"
					form="add-transaction-form"
					disabled={form.isSubmitting || form.walletsLoading}
				>
					{form.isSubmitting ? "Saving…" : "Save transaction"}
				</AppButton>
				<AppTextButton
					type="button"
					className="mt-10 w-full text-center"
					onClick={form.goToAmount}
					disabled={form.isSubmitting}
				>
					Back to amount
				</AppTextButton>
			</div>
		</div>
	);
};
