import {useState} from "react";
import {twx} from "@/shared/lib/twx";
import {
	getWebsiteTesting,
	setWebsiteTesting,
} from "@/shared/services/storage/appStorage";

export const WebsiteTestingSetting = () => {
	const [enabled, setEnabled] = useState(getWebsiteTesting);

	const onToggle = (next: boolean) => {
		setWebsiteTesting(next);
		setEnabled(next);
	};

	return (
		<section className="rounded-14 border border-e-border bg-e-surface-solid p-14">
			<p className="mb-4 text-14 font-semibold text-e-heading">
				Website testing
			</p>
			<p className="mb-14 text-13 leading-140 text-e-muted">
				Lets you open the app in a desktop browser without installing the PWA.
			</p>
			<label className="flex cursor-pointer items-center justify-between gap-12">
				<span className="text-13 text-e-text">Enabled</span>
				<span className="relative inline-flex shrink-0">
					<input
						type="checkbox"
						className="peer sr-only"
						checked={enabled}
						onChange={(event) => onToggle(event.target.checked)}
					/>
					<span
						aria-hidden="true"
						className={twx(
							"block h-24 w-44 rounded-full border transition-colors duration-150",
							"border-e-muted/70 bg-e-dash-from",
							"peer-checked:border-e-heading peer-checked:bg-e-heading",
						)}
					/>
					<span
						aria-hidden="true"
						className={twx(
							"pointer-events-none absolute top-3 left-3 size-18 rounded-full shadow-sm",
							"bg-e-heading transition-transform duration-150",
							"peer-checked:translate-x-20 peer-checked:bg-e-bg",
						)}
					/>
				</span>
			</label>
		</section>
	);
};
