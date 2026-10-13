import {
	TRANSACTION_CATEGORY_OPTIONS,
	type TransactionCategory,
} from "@/features/transactions/types/transactionCategory";
import {TransactionCategoryIcon} from "@/shared/icons/TransactionCategoryIcon/TransactionCategoryIcon";
import {twx} from "@/shared/utils/twx";

type TransactionCategoryPickerProps = {
	value: TransactionCategory | null;
	onChange: (category: TransactionCategory) => void;
	error?: string;
};

export const TransactionCategoryPicker = ({
	value,
	onChange,
	error,
}: TransactionCategoryPickerProps) => (
	<div>
		<p
			className={twx(
				"mb-8 text-12 font-medium tracking-label uppercase",
				error ? "text-e-error" : "text-e-muted",
			)}
		>
			Category
		</p>
		<div
			className="grid grid-cols-2 gap-8"
			role="radiogroup"
			aria-label="Category"
			aria-invalid={error ? true : undefined}
		>
			{TRANSACTION_CATEGORY_OPTIONS.map((category, index) => {
				const isSelected = value === category;
				const isLastOddCell =
					TRANSACTION_CATEGORY_OPTIONS.length % 2 === 1 &&
					index === TRANSACTION_CATEGORY_OPTIONS.length - 1;

				return (
					<button
						key={category}
						type="button"
						role="radio"
						aria-checked={isSelected}
						onClick={() => onChange(category)}
						className={twx(
							"flex min-h-44 items-center gap-8 rounded-14 border px-10 py-9 text-left",
							isLastOddCell && "col-span-2",
							"transition-(border-color,background-color,box-shadow) duration-200",
							"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-zinc",
							isSelected
								? "border-white/28 bg-white/10 shadow-e-chip-selected"
								: "border-white/10 bg-white/3 hover:border-white/18 hover:bg-white/5",
						)}
					>
						<TransactionCategoryIcon category={category} size="sm" />
						<span className="min-w-0 flex-1 text-13 font-semibold leading-120 tracking-tight-03 text-e-zinc">
							{category}
						</span>
					</button>
				);
			})}
		</div>
		{error ? (
			<p role="alert" className="mt-8 text-13 font-medium text-e-error">
				{error}
			</p>
		) : null}
	</div>
);
