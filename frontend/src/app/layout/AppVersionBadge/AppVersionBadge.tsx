import {useLocation, useNavigate} from "react-router-dom";

import {APP_VERSION} from "@/app/config/appVersion";
import {APP_ROUTES} from "@/app/navigation/routes";
import {twx} from "@/shared/lib/twx";
import {getWebsiteTesting} from "@/shared/services/storage/appStorage";

export const AppVersionBadge = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const isWebsiteTesting = getWebsiteTesting();
	const isAppRoute = location.pathname.startsWith(APP_ROUTES.APP);

	if (isAppRoute) {
		return null;
	}

	return (
		<button
			type="button"
			onClick={() => navigate(APP_ROUTES.DEV_TOOLS)}
			className={twx(
				"fixed right-20 bottom-[max(20px,env(safe-area-inset-bottom))] z-50",
				"cursor-pointer rounded-full border px-10 py-5 text-10 font-medium",
				"transition-(border-color,background,color) duration-150",
				"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-heading",
				isWebsiteTesting
					? "border-e-heading/30 bg-e-heading/10 text-e-heading"
					: "border-e-border bg-e-subtle/90 text-e-muted hover:border-e-heading/20 hover:text-e-text",
			)}
		>
			v{APP_VERSION}
		</button>
	);
};
