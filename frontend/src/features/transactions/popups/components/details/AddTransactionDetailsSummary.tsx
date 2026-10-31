import {addTransactionPopupService} from "@/features/transactions/popups/services/addTransactionPopupService";
import {CURRENCY_TYPE_DISPLAY} from "@/features/wallets/walletDisplayService";
import type {CurrencyType} from "@/features/wallets/walletTypes";
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
		<div className="rounded-14 border border-white/10 bg-white/4 px-16 py-14">
			<div className="flex items-center justify-between gap-14">
				<p
					className={twx(
						"m-0 min-w-0 text-24 font-semibold tabular-nums tracking-tight-03 leading-none",
						isIncome ? "text-e-positive" : "text-e-error",
					)}
					aria-live="polite"
					aria-atomic="true"
				>
					{amountLabel}
				</p>

				<span
					className={twx(
						"inline-flex shrink-0 items-center justify-center rounded-full px-10 py-6",
						"text-12 font-semibold leading-none tracking-wide uppercase",
						isIncome
							? "bg-e-positive/14 text-e-positive"
							: "bg-e-error/14 text-e-error",
					)}
				>
					{typeLabel}
				</span>
			</div>
			
			{walletLabel ? (
				<p className="m-0 mt-8 truncate text-14 text-e-muted">{walletLabel}</p>
			) : null}
		</div>
	);
};
