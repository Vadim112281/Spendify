import type {InputHTMLAttributes} from "react";

import {twx} from "@/shared/lib/twx";

type AppFieldSize = "sm" | "md";

type AppFieldProps = {
	id: string;
	label: string;
	size?: AppFieldSize;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

export const AppField = ({
	id,
	label,
	size = "md",
	className,
	...props
}: AppFieldProps) => (
	<div>
		<label
			htmlFor={id}
			className={twx(
				"block font-medium tracking-label text-e-muted uppercase",
				size === "sm" ? "mb-4 text-10" : "mb-6 text-12",
			)}
		>
			{label}
		</label>
		<input
			id={id}
			className={twx(
				"w-full border border-e-border bg-e-subtle text-e-heading",
				size === "sm"
					? "rounded-12 px-12 py-10 text-14"
					: "rounded-14 px-14 py-13 text-15",
				"placeholder:text-e-muted",
				"transition-colors duration-150",
				"focus:border-e-heading/20 focus:outline-none",
				"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-heading",
				className,
			)}
			{...props}
		/>
	</div>
);
