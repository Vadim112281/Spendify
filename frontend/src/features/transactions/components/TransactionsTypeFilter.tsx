import {
	TRANSACTIONS_VIEW_FILTER,
	type TransactionsViewFilter,
} from "@/features/transactions/types/transactionsViewFilter";
import {twx} from "@/shared/utils/twx";

type TransactionsTypeFilterProps = {
	value: TransactionsViewFilter;
	onChange: (value: TransactionsViewFilter) => void;
};

const OPTIONS: {value: TransactionsViewFilter; label: string}[] = [
	{value: TRANSACTIONS_VIEW_FILTER.EXPENSES, label: "Expenses"},
	{value: TRANSACTIONS_VIEW_FILTER.INCOME, label: "Income"},
	{value: TRANSACTIONS_VIEW_FILTER.ALL, label: "All"},
];

export const TransactionsTypeFilter = ({
	value,
	onChange,
}: TransactionsTypeFilterProps) => (
	<div
		className="grid grid-cols-3 gap-6 rounded-14 border border-white/10 bg-transparent p-4"
		role="radiogroup"
		aria-label="Transaction filter"
	>
		{OPTIONS.map((option) => {
			const isSelected = value === option.value;
			const isExpenses = option.value === TRANSACTIONS_VIEW_FILTER.EXPENSES;
			const isIncome = option.value === TRANSACTIONS_VIEW_FILTER.INCOME;

			return (
				// biome-ignore lint/a11y/useSemanticElements: styled segmented control (radiogroup + button)
				<button
					key={option.value}
					type="button"
					role="radio"
					aria-checked={isSelected}
					onClick={() => onChange(option.value)}
					className={twx(
						"min-h-44 rounded-11 px-4 text-13 font-semibold tracking-tight-03 transition-(background,color,box-shadow) duration-200",
						"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-zinc",
						isSelected
							? isExpenses
								? "bg-e-error/18 text-e-error shadow-e-chip-selected"
								: isIncome
									? "bg-e-positive/18 text-e-positive shadow-e-chip-selected"
									: "bg-white/12 text-e-heading shadow-e-chip-selected"
							: "text-e-muted hover:bg-white/5 hover:text-e-zinc",
					)}
				>
					{option.label}
				</button>
			);
		})}
	</div>
);
