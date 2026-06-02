import {usePwaInstall} from "@/pages/mobile-install/model/usePwaInstall";
import {twx} from "@/shared/lib/twx";
import {AppButton} from "@/shared/ui/AppButton/AppButton";
import {AppHeading} from "@/shared/ui/AppHeading/AppHeading";
import {EntryDashboard} from "@/shared/ui/EntryDashboard/EntryDashboard";
import {EntryBrand, EntryLayout} from "@/shared/ui/EntryLayout/EntryLayout";

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
	const {canInstall, install, isIos} = usePwaInstall();

	return (
		<EntryLayout hero={<EntryDashboard />}>
			<EntryBrand />
			<AppHeading className="mb-10">Встановіть Spendify</AppHeading>
			<p className="mb-22 text-15 leading-155 text-e-text">
				Контроль витрат і заощаджень у зручному мобільному застосунку — без
				адресного рядка браузера.
			</p>

			{canInstall && (
				<AppButton className="mb-18" showArrow onClick={install}>
					Встановити
				</AppButton>
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
								className="grid size-28 shrink-0 place-items-center rounded-9 bg-linear-[145deg] from-e-dash-from to-e-dash-to text-12 font-bold text-e-heading"
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
