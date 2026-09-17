import type {ComponentType} from "react";
import {AnalyticsTabIcon} from "@/app/layout/AppTabBar/components/icons/AnalyticsTabIcon";
import {HomeTabIcon} from "@/app/layout/AppTabBar/components/icons/HomeTabIcon";
import {OperationsTabIcon} from "@/app/layout/AppTabBar/components/icons/OperationsTabIcon";
import {ProfileTabIcon} from "@/app/layout/AppTabBar/components/icons/ProfileTabIcon";
import type {TabIconActiveProps} from "@/app/layout/AppTabBar/components/icons/TabIcon";
import type {AppTabRoute} from "@/app/navigation/appTabs";
import {APP_ROUTES} from "@/app/navigation/routes";

type TabUiConfig = {
	label: string;
	icon: ComponentType<TabIconActiveProps>;
};

export const TAB_BAR_UI: Record<AppTabRoute, TabUiConfig> = {
	[APP_ROUTES.APP_HOME]: {
		label: "Home",
		icon: HomeTabIcon,
	},
	[APP_ROUTES.APP_OPERATIONS]: {
		label: "Operations",
		icon: OperationsTabIcon,
	},
	[APP_ROUTES.APP_ANALYTICS]: {
		label: "Analytics",
		icon: AnalyticsTabIcon,
	},
	[APP_ROUTES.APP_PROFILE]: {
		label: "Profile",
		icon: ProfileTabIcon,
	},
};
