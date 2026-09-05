import type {InputHTMLAttributes} from "react";

import {twx} from "@/shared/lib/twx";

type AppFieldSize = "sm" | "md";

type AppFieldProps = {
	id: string;
	label: string;
	size?: AppFieldSize;
	error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

export const AppField = ({
	id,
	label,
	size = "md",
	error,
	className,
	...props
}: AppFieldProps) => (
	<div>
		<label
			htmlFor={id}
			className={twx(
				"block font-medium tracking-label uppercase",
				size === "sm" ? "mb-4 text-10" : "mb-6 text-12",
				error ? "text-e-error" : "text-e-muted",
			)}
		>
			{label}
		</label>
		<input
			id={id}
			aria-invalid={error ? true : undefined}
			aria-describedby={error ? `${id}-error` : undefined}
			className={twx(
				"w-full border bg-e-subtle text-e-heading",
				error
					? "border-e-error bg-e-error/8 focus:border-e-error"
					: "border-e-border focus:border-e-heading/20",
				size === "sm"
					? "rounded-12 px-12 py-10 text-14"
					: "rounded-14 px-14 py-13 text-15",
				"placeholder:text-e-muted",
				"transition-colors duration-150",
				"focus:outline-none",
				"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-heading",
				className,
			)}
			{...props}
		/>
		{error && (
			<p
				id={`${id}-error`}
				role="alert"
				className={twx(
					"font-medium leading-140 text-e-error",
					size === "sm" ? "mt-6 text-12" : "mt-8 text-13",
				)}
			>
				{error}
			</p>
		)}
	</div>
);
