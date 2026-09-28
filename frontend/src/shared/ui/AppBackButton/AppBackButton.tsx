import type {ButtonHTMLAttributes} from "react";

import {twx} from "@/shared/utils/twx";
import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";

type AppBackButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const AppBackButton = ({
	className,
	type = "button",
	"aria-label": ariaLabel = "Back",
	...props
}: AppBackButtonProps) => (
	<button
		type={type}
		aria-label={ariaLabel}
		className={twx(
			"flex size-38 items-center justify-center rounded-full",
			"border border-white/10 bg-white/6 text-e-zinc",
			"transition-colors duration-150 hover:bg-white/10",
			"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-zinc",
			className,
		)}
		{...props}
	>
		<AppDecorativeIcon width={18} height={18} strokeWidth={2}>
			<path d="M15 6l-6 6 6 6" />
		</AppDecorativeIcon>
	</button>
);
