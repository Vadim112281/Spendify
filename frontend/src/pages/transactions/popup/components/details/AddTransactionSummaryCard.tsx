import type {ReactNode} from "react";

import {twx} from "@/shared/utils/twx";

type AddTransactionSummaryCardProps = {
	children: ReactNode;
	className?: string;
	"aria-label": string;
};

export const AddTransactionSummaryCard = ({
	children,
	className,
	"aria-label": ariaLabel,
}: AddTransactionSummaryCardProps) => (
	<section
		className={twx(
			"relative overflow-hidden rounded-18 e-home-stat-surface",
			className,
		)}
		aria-label={ariaLabel}
	>
		<div className="relative">{children}</div>
	</section>
);
