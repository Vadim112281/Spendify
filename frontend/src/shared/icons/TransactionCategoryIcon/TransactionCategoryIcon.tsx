import type {ReactNode} from "react";

import {
	TRANSACTION_CATEGORY,
	type TransactionCategory,
} from "@/features/transactions/types/transactionCategory";
import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";
import {twx} from "@/shared/utils/twx";

const CATEGORY_ICONS: Record<TransactionCategory, ReactNode> = {
	[TRANSACTION_CATEGORY.CAFE]: (
		<>
			<path d="M17 8h1a4 4 0 0 1 0 8h-1" />
			<path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
			<path d="M6 2v2M10 2v2M14 2v2" />
		</>
	),
	[TRANSACTION_CATEGORY.SALARY]: (
		<>
			<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
		</>
	),
	[TRANSACTION_CATEGORY.TRANSPORT]: (
		<>
			<path d="M4 6h16v10H4z" />
			<path d="M4 10h16" />
			<path d="M8 16h.01M16 16h.01" />
		</>
	),
	[TRANSACTION_CATEGORY.GROCERIES]: (
		<>
			<path d="M6 6h15l-1.5 9H7.5L6 6z" />
			<path d="M6 6 5 3H2" />
			<circle cx="9" cy="20" r="1" />
			<circle cx="18" cy="20" r="1" />
		</>
	),
	[TRANSACTION_CATEGORY.SUBSCRIPTION]: (
		<>
			<rect x="2" y="7" width="20" height="14" rx="2" />
			<path d="M16 3v4M8 3v4" />
		</>
	),
};

type TransactionCategoryIconProps = {
	category: TransactionCategory;
	size?: "sm" | "md";
};

export const TransactionCategoryIcon = ({
	category,
	size = "md",
}: TransactionCategoryIconProps) => (
	<div
		className={twx(
			"grid shrink-0 place-items-center border border-white/10 bg-white/6 text-e-heading",
			size === "sm" ? "size-32 rounded-10" : "size-38 rounded-11",
		)}
		aria-hidden="true"
	>
		<AppDecorativeIcon
			width={size === "sm" ? 16 : 18}
			height={size === "sm" ? 16 : 18}
			strokeWidth={1.65}
		>
			{CATEGORY_ICONS[category]}
		</AppDecorativeIcon>
	</div>
);
