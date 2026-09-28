import type {ReactNode} from "react";

import {twx} from "@/shared/utils/twx";

type HomeDashTileProps = {
	children: ReactNode;
	className?: string;
	"aria-label": string;
};

export const HomeDashTile = ({
	children,
	className,
	"aria-label": ariaLabel,
}: HomeDashTileProps) => (
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
