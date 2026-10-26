import type {ReactNode} from "react";

type AppMonthPageHeaderProps = {
	label: string;
	title: string;
	trailing?: ReactNode;
};

export const AppMonthPageHeader = ({
	label,
	title,
	trailing,
}: AppMonthPageHeaderProps) => (
	<div className="flex items-start gap-12">
		<div className="min-w-0 flex-1">
			<p className="m-0 text-11 font-medium tracking-label text-e-zinc uppercase">
				{label}
			</p>
			<h1 className="m-0 mt-6 text-26 font-semibold leading-120 tracking-tight-03 text-e-heading">
				{title}
			</h1>
		</div>

		{trailing ?? null}
	</div>
);
