import type {CurrencyType} from "@/features/wallets/walletTypes";
import {
	CURRENCY_TYPE_DISPLAY,
	CURRENCY_TYPE_OPTIONS,
} from "@/pages/wallets/config/createWalletFormConfig";
import {CURRENCY_ACCENT_STYLES} from "@/pages/wallets/config/currencyAccentConfig";
import {twx} from "@/shared/lib/twx";

type CurrencySelectorProps = {
	value: CurrencyType | null;
	onChange: (currencyType: CurrencyType) => void;
};

export const CurrencySelector = ({value, onChange}: CurrencySelectorProps) => (
	<div
		className="grid grid-cols-3 gap-10"
		role="radiogroup"
		aria-label="Currency"
	>
		{CURRENCY_TYPE_OPTIONS.map((currencyType) => {
			const isSelected = value === currencyType;
			const {label, symbol} = CURRENCY_TYPE_DISPLAY[currencyType];
			const accent = CURRENCY_ACCENT_STYLES[currencyType];

			return (
				<button
					key={currencyType}
					type="button"
					role="radio"
					aria-checked={isSelected}
					onClick={() => onChange(currencyType)}
					className={twx(
						"flex flex-col items-center gap-8 rounded-14 border py-10",
						"transition-(border-color,background-color,box-shadow) duration-150",
						"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-zinc",
						isSelected
							? "border-white/30 bg-white/8 shadow-e-chip-selected"
							: "border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5",
					)}
				>
					<span
						className={twx(
							"grid size-36 place-items-center rounded-10 border text-18 font-semibold leading-none",
							"transition-(border-color,background-color,color) duration-150",
							isSelected
								? twx(accent.symbolBadge, accent.symbolText)
								: "border-white/8 bg-white/5 text-e-text",
						)}
					>
						{symbol}
					</span>
					<span
						className={twx(
							"text-12 font-medium",
							isSelected ? "text-e-zinc" : "text-e-muted",
						)}
					>
						{label}
					</span>
				</button>
			);
		})}
	</div>
);
