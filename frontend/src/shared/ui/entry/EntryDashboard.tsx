import {twx} from "@/shared/lib/twx";

type EntryDashboardProps = {
	variant?: "default" | "phone" | "success";
};

const badgeClass =
	"absolute top-14 right-14 z-2 grid size-34 place-items-center rounded-11 border border-white/10 bg-white/6 backdrop-blur-sm";

export const EntryDashboard = ({variant = "default"}: EntryDashboardProps) => (
	<div
		className="bg-e-dash relative overflow-hidden rounded-18 border border-white/10 p-16 text-e-heading shadow-e-dash"
		aria-hidden="true"
	>
		<div className="relative z-1 mb-14 flex gap-5">
			<span className="size-6 rounded-full bg-e-text/45" />
			<span className="size-6 rounded-full bg-e-text/45" />
			<span className="size-6 rounded-full bg-e-text/45" />
		</div>

		<div className="grid-entry-dashboard relative z-1 grid items-end gap-12">
			<div className="flex min-w-0 flex-col gap-3">
				<span className="text-10 font-medium tracking-label text-e-text uppercase">
					Баланс
				</span>
				<span className="text-21 leading-110 font-bold tracking-tight-03 text-e-heading tabular-nums">
					₴ <span className="opacity-90">24 850</span>
				</span>
				<span className="text-11 font-medium text-e-positive">
					+₴ 3 200 за місяць
				</span>
			</div>

			<div className="h-54 min-w-0 overflow-hidden rounded-12 border border-white/10 bg-black/22">
				{/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative preview */}
				<svg
					className="block h-full w-full"
					viewBox="0 0 120 48"
					preserveAspectRatio="none"
					aria-hidden
				>
					<path
						className="entry-sparkline-fill"
						d="M0 48 L0 32 L20 28 L40 34 L60 18 L80 24 L100 10 L120 14 L120 48 Z"
					/>
					<path
						className="entry-sparkline-line animate-entry-draw"
						d="M0 32 L20 28 L40 34 L60 18 L80 24 L100 10 L120 14"
					/>
				</svg>
			</div>
		</div>

		<div className="relative z-1 mt-14 flex flex-wrap gap-6">
			{["Кафе", "Транспорт", "Зарплата"].map((label, i) => (
				<span
					key={label}
					className={twx(
						"rounded-full border border-white/10 bg-white/6 px-11 py-5 text-10 font-medium text-e-text backdrop-blur-sm",
						"animate-entry-tag-in",
					)}
					style={{animationDelay: `${0.15 + i * 0.15}s`}}
				>
					{label}
				</span>
			))}
		</div>

		{variant === "phone" && (
			<div className={badgeClass}>
				{/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative */}
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.75"
					aria-hidden
				>
					<rect x="7" y="2" width="10" height="20" rx="2" />
					<path d="M11 18h2" />
				</svg>
			</div>
		)}

		{variant === "success" && (
			<div className={badgeClass}>
				<span className="text-15 font-bold text-e-positive">✓</span>
			</div>
		)}
	</div>
);
