import {addTransactionPopupService} from "@/pages/transactions/popup/services/addTransactionPopupService";
import type {CurrencyType} from "@/features/wallets/walletTypes";
import {AddTransactionSummaryCard} from "@/pages/transactions/popup/components/details/AddTransactionSummaryCard";
import {CURRENCY_TYPE_DISPLAY} from "@/features/wallets/walletDisplayService";
import {formatCurrencyAmount} from "@/shared/utils/moneyFormat";
import {twx} from "@/shared/utils/twx";

type AddTransactionDetailsSummaryProps = {
	amountInput: string;
	currency: CurrencyType;
	typeLabel: string;
	walletLabel?: string;
};

export const AddTransactionDetailsSummary = ({
	amountInput,
	currency,
	typeLabel,
	walletLabel,
}: AddTransactionDetailsSummaryProps) => {
	const isIncome = typeLabel === "Income";
	const parsedAmount =
		addTransactionPopupService.parseAmountInput(amountInput) ?? 0;
	const signedAmount = isIncome ? parsedAmount : -parsedAmount;
	const amountLabel = formatCurrencyAmount(
		signedAmount,
		CURRENCY_TYPE_DISPLAY[currency].symbol,
		{signed: true},
	);

	return (
		<AddTransactionSummaryCard
			className="px-16 py-14"
			aria-label="Transaction summary"
		>
			<div className="flex items-center justify-between gap-14">
				<div className="min-w-0">
					<p
						className="m-0 text-11 font-medium tracking-label text-e-muted uppercase"
					>
						{walletLabel ? "Adding to" : "Transaction"}
					</p>
					{walletLabel ? (
						<p
							className="m-0 mt-6 truncate text-15 font-semibold tracking-tight-03 text-e-heading"
						>
							{walletLabel}
						</p>
					) : null}
					<p
						className={twx(
							"m-0 font-medium",
							walletLabel ? "mt-4 text-12" : "mt-6 text-13",
							isIncome ? "text-e-positive" : "text-e-error",
						)}
					>
						{typeLabel}
					</p>
				</div>

				<p
					className={twx(
						"m-0 shrink-0 rounded-full px-12 py-8 text-15 font-semibold tabular-nums tracking-tight-03",
						isIncome
							? "bg-e-positive/14 text-e-positive"
							: "bg-e-error/14 text-e-error",
					)}
					aria-live="polite"
					aria-atomic="true"
				>
					{amountLabel}
				</p>
			</div>
		</AddTransactionSummaryCard>
	);
};
