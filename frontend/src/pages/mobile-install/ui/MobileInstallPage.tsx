import {twx} from "@/shared/lib/twx";
import {EntryDashboard} from "@/shared/ui/entry/EntryDashboard";
import {EntryBrand, EntryLayout} from "@/shared/ui/entry/EntryLayout";

import {usePwaInstall} from "../model/usePwaInstall";

// TODO: Rework it in normal way
const iosSteps = [
	{
		id: "share",
		text: (
			<>
				Натисніть <strong>Поділитися</strong> у Safari
			</>
		),
	},
	{
		id: "add-home",
		text: (
			<>
				Оберіть <strong>На екран «Додому»</strong>
			</>
		),
	},
	{
		id: "confirm",
		text: (
			<>
				Натисніть <strong>Додати</strong>
			</>
		),
	},
];

export const MobileInstallPage = () => {
	const {canInstall, install, isIos, isStandalone} = usePwaInstall();

	if (isStandalone) {
		return (
			<EntryLayout hero={<EntryDashboard variant="success" />}>
				<EntryBrand />
				<h1 className="text-entry-title mb-10 text-center leading-120 font-semibold tracking-tight-03 text-e-heading">
					Готово
				</h1>
				<p className="text-center text-15 leading-155 text-e-text">
					Spendify на головному екрані. Скоро тут буде ваш фінансовий дашборд.
				</p>
			</EntryLayout>
		);
	}

	return (
		<EntryLayout hero={<EntryDashboard />}>
			<EntryBrand />
			<h1 className="text-entry-title mb-10 leading-120 font-semibold tracking-tight-03 text-e-heading">
				Встановіть Spendify
			</h1>
			<p className="mb-22 text-15 leading-155 text-e-text">
				Контроль витрат і заощаджень у зручному мобільному застосунку — без
				адресного рядка браузера.
			</p>

			{canInstall && (
				<button
					type="button"
					className={twx(
						"group mb-18 flex w-full cursor-pointer items-center justify-center gap-8",
						"rounded-14 border-none bg-e-btn-bg px-20 py-15 text-15 font-semibold text-e-btn-fg",
						"shadow-e-btn transition-(transform,background) duration-150",
						"hover:-translate-y-px hover:bg-e-btn-hover active:translate-y-0",
						"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-heading",
					)}
					onClick={install}
				>
					Встановити
					<span
						className="opacity-65 transition-transform duration-150 group-hover:translate-x-3"
						aria-hidden="true"
					>
						→
					</span>
				</button>
			)}

			{isIos && (
				<ol className="m-0 list-none overflow-hidden rounded-16 border border-e-border bg-e-subtle p-0">
					{iosSteps.map((step, index) => (
						<li
							key={step.id}
							className={twx(
								"flex items-start gap-12 p-12 transition-colors duration-150",
								index > 0 && "border-t border-e-border",
								"hover:bg-e-surface-solid/40",
							)}
						>
							<span
								className="bg-e-step-num grid size-28 shrink-0 place-items-center rounded-9 text-12 font-bold text-e-heading"
								aria-hidden="true"
							>
								{index + 1}
							</span>
							<p className="m-0 pt-3 text-14 leading-145 text-e-text [&_strong]:font-semibold [&_strong]:text-e-heading">
								{step.text}
							</p>
						</li>
					))}
				</ol>
			)}

			{!isIos && !canInstall && (
				<p className="mt-18 border-t border-dashed border-e-border pt-18 text-13 leading-normal text-e-muted">
					Відкрийте в Chrome на Android — з’явиться кнопка встановлення. Або
					через меню: «Встановити застосунок».
				</p>
			)}
		</EntryLayout>
	);
};
