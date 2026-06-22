import type {ButtonHTMLAttributes, ReactNode} from "react";

import {twx} from "@/shared/lib/twx";

type AppTextButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
	emphasis?: boolean;
};

export const AppTextButton = ({
	children,
	className,
	emphasis = false,
	...props
}: AppTextButtonProps) => (
	<button
		type="button"
		className={twx(
			"cursor-pointer border-none bg-transparent p-0 text-13 text-e-text underline-offset-2",
			"transition-(color,transform) duration-200 active:scale-96",
			emphasis && "font-medium",
			"hover:text-e-heading hover:underline",
			"focus-visible:rounded-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-heading",
			"disabled:cursor-default disabled:opacity-60 disabled:active:scale-100",
			className,
		)}
		{...props}
	>
		{children}
	</button>
);
