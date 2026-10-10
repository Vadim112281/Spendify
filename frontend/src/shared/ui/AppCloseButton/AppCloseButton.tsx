import type {ButtonHTMLAttributes} from "react";

import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";
import {twx} from "@/shared/utils/twx";

type AppCloseButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const AppCloseButton = ({
	className,
	type = "button",
	"aria-label": ariaLabel = "Close",
	...props
}: AppCloseButtonProps) => (
	<button
		type={type}
		aria-label={ariaLabel}
		className={twx(
			"flex size-44 shrink-0 items-center justify-center rounded-full",
			"border border-white/10 bg-white/6 text-e-heading",
			"transition-colors duration-150 hover:bg-white/10",
			"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-heading",
			className,
		)}
		{...props}
	>
		<AppDecorativeIcon width={16} height={16} strokeWidth={2}>
			<path d="M6 6l12 12M18 6 6 18" />
		</AppDecorativeIcon>
	</button>
);
