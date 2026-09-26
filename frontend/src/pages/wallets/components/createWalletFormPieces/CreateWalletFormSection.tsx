import type {ReactNode} from "react";

import {twx} from "@/shared/lib/twx";

type CreateWalletFormSectionProps = {
	label: string;
	children: ReactNode;
	error?: string;
};

export const CreateWalletFormSection = ({
	label,
	children,
	error,
}: CreateWalletFormSectionProps) => (
	<section>
		<h3
			className={twx(
				"mb-10 text-11 font-medium tracking-label uppercase",
				error ? "text-e-error" : "text-e-muted",
			)}
		>
			{label}
		</h3>
		{children}
		{error ? (
			<p role="alert" className="mt-12 text-12 font-medium text-e-error">
				{error}
			</p>
		) : null}
	</section>
);
