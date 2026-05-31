import type {ReactNode} from "react";

import {twx} from "@/shared/lib/twx";

import {SpendifyAppIcon} from "./SpendifyAppIcon";

type EntryLayoutProps = {
	children: ReactNode;
	wide?: boolean;
	hero?: ReactNode;
};

export const EntryLayout = ({
	children,
	wide = false,
	hero,
}: EntryLayoutProps) => (
	<div
		className={twx(
			"fixed inset-0 box-border flex w-full max-w-full items-center justify-center",
			"overflow-x-hidden overflow-y-auto overscroll-none touch-pan-y",
			"px-20 pt-[max(20px,env(safe-area-inset-top))] pb-[max(28px,env(safe-area-inset-bottom))]",
			"bg-e-bg text-e-text color-scheme-dark",
			"before:fixed before:inset-0 before:-z-10 before:bg-e-bg before:content-empty",
		)}
	>
		<main className="relative z-1 box-border w-full max-w-card">
			<div
				className={twx(
					"flex w-full max-w-full touch-manipulation flex-col overflow-hidden rounded-24 border border-e-border bg-e-surface shadow-e-card",
					wide && "max-w-card-lg",
				)}
			>
				{hero ? <div className="px-16 pt-16">{hero}</div> : null}
				<div className="p-entry-card flex flex-col pt-18">{children}</div>
			</div>
		</main>
	</div>
);

export const EntryBrand = () => (
	<div className="mb-20 flex items-center gap-10">
		<SpendifyAppIcon />
		<span className="text-17 font-semibold tracking-tight-03 text-e-heading">
			Spendify
		</span>
		<span className="ml-auto rounded-full border border-e-border bg-e-subtle px-10 py-4 text-10 font-semibold tracking-caps text-e-muted uppercase">
			Фінанси
		</span>
	</div>
);
