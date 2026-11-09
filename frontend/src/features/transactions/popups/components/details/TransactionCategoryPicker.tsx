import {motion, useReducedMotion} from "motion/react";
import {useId, useMemo, useState} from "react";

import {CategoryFormPopup} from "@/features/categories/components/CategoryFormPopup";
import {CategoryIcon} from "@/features/categories/components/CategoryIcon";
import {useUserCategories} from "@/features/categories/hooks/useUserCategories";
import type {UserCategory} from "@/features/categories/types/categoryTypes";
import {
	AddTransactionDropdownListPanel,
	addTransactionDropdownChevronTransition,
	addTransactionDropdownShellClassName,
} from "@/features/transactions/popups/components/details/AddTransactionDropdownListPanel";
import {useDropdownShellOpen} from "@/features/transactions/popups/hooks/useDropdownShellOpen";
import {categoryKindForTransactionType} from "@/features/transactions/services/transactionCategoryService";
import type {TransactionType} from "@/features/transactions/types/transactionTypes";
import {ChevronDownIcon} from "@/features/wallets/components/icons/ChevronDownIcon";
import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";
import {twx} from "@/shared/utils/twx";

type TransactionCategoryPickerProps = {
	transactionType: TransactionType;
	value: string | null;
	onChange: (categoryId: string) => void;
	error?: string;
};

export const TransactionCategoryPicker = ({
	transactionType,
	value,
	onChange,
	error,
}: TransactionCategoryPickerProps) => {
	const listboxId = useId();
	const reducedMotion = useReducedMotion();
	const [isOpen, setIsOpen] = useState(false);
	const [addOpen, setAddOpen] = useState(false);
	const {shellOpen, onListClosed} = useDropdownShellOpen(isOpen);

	const {categories, isLoading, error: loadError} = useUserCategories();
	const kind = categoryKindForTransactionType(transactionType);

	const options = useMemo(
		() => categories.filter((c) => c.kind === kind),
		[categories, kind],
	);

	const selected = useMemo(
		() => categories.find((c) => c.categoryId === value),
		[categories, value],
	);

	const hasCategoryOptions = options.length > 0;

	const handleToggle = () => {
		if (!isLoading && !loadError && !hasCategoryOptions) {
			setAddOpen(true);
			return;
		}

		setIsOpen((open) => !open);
	};

	const handlePick = (category: UserCategory) => {
		onChange(category.categoryId);
		setIsOpen(false);
	};

	const handleOpenAdd = () => {
		setIsOpen(false);
		setAddOpen(true);
	};

	const handleSaved = (category: UserCategory) => {
		onChange(category.categoryId);
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
					{selected ? (
						<>
							<CategoryIcon iconKey={selected.iconKey} size="sm" />
							<span className="min-w-0 flex-1 truncate text-15 font-semibold tracking-tight-03 text-e-zinc">
								{selected.name}
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
					listClassName="flex flex-col gap-0 border-t border-white/10"
					onExitComplete={onListClosed}
				>
					<div className="flex max-h-[min(50dvh,280px)] min-h-0 flex-col">
						<div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain p-6 scrollbar-hidden">
							{isLoading ? (
								<p className="m-0 px-10 py-8 text-14 text-e-muted">
									Loading categories…
								</p>
							) : loadError ? (
								<p
									role="alert"
									className="m-0 px-10 py-8 text-13 font-medium text-e-error"
								>
									{loadError}
								</p>
							) : !hasCategoryOptions ? (
								<p className="m-0 px-10 py-8 text-14 text-e-muted">
									No categories yet. Add one below.
								</p>
							) : (
								<div
									id={listboxId}
									role="listbox"
									aria-labelledby={`${listboxId}-label`}
								>
									{options.map((category) => {
										const isSelected = value === category.categoryId;

										return (
											<div key={category.categoryId} role="presentation">
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
													<CategoryIcon iconKey={category.iconKey} size="sm" />
													<span
														className={twx(
															"min-w-0 flex-1 text-14 font-semibold tracking-tight-03",
															isSelected ? "text-e-heading" : "text-e-zinc",
														)}
													>
														{category.name}
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
							)}
						</div>
						<div className="shrink-0 border-t border-white/10 bg-e-subtle p-6">
							<button
								type="button"
								className={twx(
									"flex min-h-44 w-full cursor-pointer items-center justify-center rounded-10 px-10 py-8",
									"text-14 font-semibold tracking-tight-03 text-e-heading",
									"bg-white/8 transition-colors duration-150 hover:bg-white/12",
									"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-zinc",
								)}
								aria-label="Add category"
								onClick={handleOpenAdd}
							>
								Add category
							</button>
						</div>
					</div>
				</AddTransactionDropdownListPanel>
			</div>

			<CategoryFormPopup
				open={addOpen}
				onOpenChange={setAddOpen}
				kind={kind}
				onSaved={handleSaved}
			/>

			{error ? (
				<p role="alert" className="mt-8 text-13 font-medium text-e-error">
					{error}
				</p>
			) : null}
		</div>
	);
};
