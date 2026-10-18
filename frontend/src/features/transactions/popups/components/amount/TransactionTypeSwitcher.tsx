import {
	TRANSACTION_TYPE,
	type TransactionType,
} from "@/features/transactions/types/transactionTypes";
import {twx} from "@/shared/utils/twx";

type TransactionTypeSwitcherProps = {
	value: TransactionType;
	onChange: (type: TransactionType) => void;
};

const OPTIONS: {value: TransactionType; label: string}[] = [
	{value: TRANSACTION_TYPE.EXPENSE, label: "Expense"},
	{value: TRANSACTION_TYPE.INCOME, label: "Income"},
];

export const TransactionTypeSwitcher = ({
	value,
	onChange,
}: TransactionTypeSwitcherProps) => (
	<div
		className="grid grid-cols-2 gap-8 rounded-14 border border-white/10 bg-white/3 p-4"
		role="radiogroup"
		aria-label="Transaction type"
	>
		{OPTIONS.map((option) => {
			const isSelected = value === option.value;
			const isIncome = option.value === TRANSACTION_TYPE.INCOME;

			return (
				<button
					key={option.value}
					type="button"
					role="radio"
					aria-checked={isSelected}
					onClick={() => onChange(option.value)}
					className={twx(
						"min-h-44 rounded-11 px-12 text-14 font-semibold tracking-tight-03 transition-(background,color,box-shadow) duration-200",
						"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-zinc",
						isSelected
							? isIncome
								? "bg-e-positive/18 text-e-positive shadow-e-chip-selected"
								: "bg-e-error/18 text-e-error shadow-e-chip-selected"
							: "text-e-muted hover:bg-white/5 hover:text-e-zinc",
					)}
				>
					{option.label}
				</button>
			);
		})}
	</div>
);
