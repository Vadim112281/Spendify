import type {ButtonHTMLAttributes, ReactNode} from "react";

import {twx} from "@/shared/lib/twx";

type AppButtonSize = "sm" | "md";

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
	size?: AppButtonSize;
	showArrow?: boolean;
};

export const AppButton = ({
	children,
	className,
	size = "md",
	showArrow = false,
	type = "button",
	...props
}: AppButtonProps) => (
	<button
		type={type}
		className={twx(
			"group flex w-full cursor-pointer items-center justify-center gap-8",
			"rounded-14 border-none bg-e-btn-bg font-semibold text-e-btn-fg",
			size === "sm" ? "px-18 py-12 text-14" : "px-20 py-15 text-15",
			"shadow-e-btn transition-(transform,background) duration-150",
			"hover:-translate-y-px hover:bg-e-btn-hover active:translate-y-0",
			"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-heading",
			"disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0",
			className,
		)}
		{...props}
	>
		{children}
		{showArrow ? (
			<span
				className="opacity-65 transition-transform duration-150 group-hover:translate-x-3"
				aria-hidden="true"
			>
				→
			</span>
		) : null}
	</button>
);
