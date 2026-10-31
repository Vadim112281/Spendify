import {motion, useReducedMotion} from "motion/react";
import {useId, useState} from "react";

import {
	AddTransactionDropdownListPanel,
	addTransactionDropdownChevronTransition,
	addTransactionDropdownShellClassName,
} from "@/features/transactions/popups/components/details/AddTransactionDropdownListPanel";
import {useDropdownShellOpen} from "@/features/transactions/popups/hooks/useDropdownShellOpen";
import {
	TRANSACTION_CATEGORY_OPTIONS,
	type TransactionCategory,
} from "@/features/transactions/types/transactionCategory";
import {ChevronDownIcon} from "@/features/wallets/components/icons/ChevronDownIcon";
import {TransactionCategoryIcon} from "@/shared/icons/TransactionCategoryIcon/TransactionCategoryIcon";
import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";
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
}: TransactionCategoryPickerProps) => {
	const listboxId = useId();
	const reducedMotion = useReducedMotion();
	const [isOpen, setIsOpen] = useState(false);
	const {shellOpen, onListClosed} = useDropdownShellOpen(isOpen);

	const handleToggle = () => {
		setIsOpen((open) => !open);
	};

	const handlePick = (category: TransactionCategory) => {
		onChange(category);
		setIsOpen(false);
	};

	return (
		<div>
			<p
				id={`${listboxId}-label`}
				className={twx(
					"mb-8 text-12 font-medium tracking-label uppercase",
					error ? "text-e-error" : "text-e-muted",
				)}
			>
				Category
			</p>

			<div
				className={addTransactionDropdownShellClassName({
					error,
					shellOpen,
				})}
			>
				<button
					type="button"
					className={twx(
						"flex min-h-44 w-full cursor-pointer items-center gap-10 px-14 py-12 text-left",
						"transition-colors duration-150",
						"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-zinc",
					)}
					aria-haspopup="listbox"
					aria-expanded={isOpen}
					aria-controls={listboxId}
					aria-labelledby={`${listboxId}-label`}
					onClick={handleToggle}
				>
					{value ? (
						<>
							<TransactionCategoryIcon category={value} size="sm" />
							<span className="min-w-0 flex-1 truncate text-15 font-semibold tracking-tight-03 text-e-zinc">
								{value}
							</span>
						</>
					) : (
						<span className="flex-1 text-15 text-e-muted">Select category</span>
					)}

					<motion.span
						className="grid size-28 shrink-0 place-items-center rounded-full text-e-muted"
						aria-hidden="true"
						animate={{rotate: isOpen ? 180 : 0}}
						transition={
							reducedMotion
								? {duration: 0}
								: addTransactionDropdownChevronTransition
						}
					>
						<ChevronDownIcon />
					</motion.span>
				</button>

				<AddTransactionDropdownListPanel
					isOpen={isOpen}
					reducedMotion={reducedMotion}
					listClassName="flex flex-col gap-2 border-t border-white/10 p-6"
					onExitComplete={onListClosed}
				>
					<div
						id={listboxId}
						role="listbox"
						aria-labelledby={`${listboxId}-label`}
					>
						{TRANSACTION_CATEGORY_OPTIONS.map((category) => {
							const isSelected = value === category;

							return (
								<div key={category} role="presentation">
									<button
										type="button"
										role="option"
										aria-selected={isSelected}
										className={twx(
											"flex min-h-44 w-full cursor-pointer items-center gap-10 rounded-10 px-10 py-8 text-left",
											"transition-colors duration-150",
											"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-zinc",
											isSelected
												? "bg-white/10"
												: "bg-transparent hover:bg-white/6",
										)}
										onClick={() => handlePick(category)}
									>
										<TransactionCategoryIcon category={category} size="sm" />
										<span
											className={twx(
												"min-w-0 flex-1 text-14 font-semibold tracking-tight-03",
												isSelected ? "text-e-heading" : "text-e-zinc",
											)}
										>
											{category}
										</span>
										<span
											className="grid size-20 shrink-0 place-items-center"
											aria-hidden="true"
										>
											{isSelected ? (
												<AppDecorativeIcon
													width={16}
													height={16}
													strokeWidth={2.25}
													className="text-e-heading"
												>
													<path d="M20 6 9 17l-5-5" />
												</AppDecorativeIcon>
											) : null}
										</span>
									</button>
								</div>
							);
						})}
					</div>
				</AddTransactionDropdownListPanel>
			</div>

			{error ? (
				<p role="alert" className="mt-8 text-13 font-medium text-e-error">
					{error}
				</p>
			) : null}
		</div>
	);
};
