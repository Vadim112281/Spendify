import type {CurrencyType} from "@/features/wallets/walletTypes";
import {CURRENCY_TYPE_DISPLAY} from "@/features/wallets/walletDisplayService";
import {formatAmountInputDisplay} from "@/shared/utils/moneyFormat";
import {twx} from "@/shared/utils/twx";

type AddTransactionAmountFieldProps = {
	amountInput: string;
	currency: CurrencyType;
	typeLabel: string;
};

export const AddTransactionAmountField = ({
	amountInput,
	currency,
	typeLabel,
}: AddTransactionAmountFieldProps) => {
	const symbol = CURRENCY_TYPE_DISPLAY[currency].symbol;
	const display = formatAmountInputDisplay(amountInput);

	return (
		<div className="flex flex-col items-center gap-10 text-center">
			<p className="m-0 text-11 font-medium tracking-label text-e-muted uppercase">
				{typeLabel}
			</p>
			<p
				className={twx(
					"m-0 inline-flex max-w-full items-baseline justify-center gap-8 truncate",
					"text-32 leading-110 font-semibold tracking-tight-03 text-e-heading tabular-nums",
				)}
				aria-live="polite"
				aria-atomic="true"
			>
				<span className="text-24 text-e-muted">{symbol}</span>
				<span>{display}</span>
			</p>
		</div>
	);
};
