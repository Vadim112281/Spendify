import {AppHeading} from "@/shared/ui/AppHeading/AppHeading";
import {AppIconLink} from "@/shared/ui/AppIconLink/AppIconLink";
import {AppIconQr} from "@/shared/ui/AppIconQr/AppIconQr";
import {EntryDashboard} from "@/shared/ui/EntryDashboard/EntryDashboard";
import {EntryBrand, EntryLayout} from "@/shared/ui/EntryLayout/EntryLayout";

const tips = [
	{
		icon: <AppIconQr />,
		label: "QR-код",
		description: "відскануйте камерою",
	},
	{
		icon: <AppIconLink />,
		label: "Посилання",
		description: "надішліть собі в месенджер",
	},
];

export const DesktopOnlyPage = () => (
	<EntryLayout wide hero={<EntryDashboard variant="phone" />}>
		<EntryBrand />
		<AppHeading className="mb-10 text-center">Облік на смартфоні</AppHeading>
		<p className="mb-22 text-center text-15 leading-155 text-e-text">
			Витрати, доходи та баланс — у кишені. Відкрийте Spendify на телефоні, щоб
			встановити застосунок.
		</p>
		<div className="grid grid-cols-2 gap-10 max-entry-sm:grid-cols-1">
			{tips.map((tip) => (
				<div
					key={tip.label}
					className="flex flex-col gap-10 rounded-14 border border-e-border bg-e-subtle p-14 text-13 leading-140 text-e-muted transition-(transform,border-color) duration-150 hover:-translate-y-0.5 hover:border-e-heading/12"
				>
					<span className="grid size-38 place-items-center rounded-11 border border-e-border bg-e-surface-solid text-e-heading">
						{tip.icon}
					</span>
					<span>
						<span className="block text-14 font-semibold text-e-heading">
							{tip.label}
						</span>
						<span className="mt-2 block text-12 text-e-muted">
							{tip.description}
						</span>
					</span>
				</div>
			))}
		</div>
		<p className="mt-18 border-t border-dashed border-e-border pt-18 text-center text-13 leading-normal text-e-muted">
			На телефоні з’явиться кнопка встановлення
		</p>
	</EntryLayout>
);
