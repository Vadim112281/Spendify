import {useNavigate} from "react-router-dom";

import {APP_VERSION} from "@/app/config/appVersion";
import {APP_ROUTES} from "@/app/navigation/routes";
import {WebsiteTestingSetting} from "@/pages/dev-tools/components/WebsiteTestingSetting";
import {twx} from "@/shared/lib/twx";
import {AppHeading} from "@/shared/ui/AppHeading/AppHeading";
import {AppTextButton} from "@/shared/ui/AppTextButton/AppTextButton";

export const DevToolsPage = () => {
	const navigate = useNavigate();

	return (
		<div
			className={twx(
				"fixed inset-0 z-50 overflow-y-auto bg-e-bg text-e-text color-scheme-dark",
				"px-20 pt-[max(20px,env(safe-area-inset-top))] pb-[max(28px,env(safe-area-inset-bottom))]",
			)}
		>
			<header className="mb-24">
				<AppTextButton
					className="mb-16"
					onClick={() => navigate(APP_ROUTES.ENTRY)}
				>
					← Назад
				</AppTextButton>
				<AppHeading className="mb-6">Dev tools</AppHeading>
				<p className="text-13 text-e-muted">v{APP_VERSION}</p>
			</header>

			<div className="flex flex-col gap-12">
				<WebsiteTestingSetting />
			</div>
		</div>
	);
};
