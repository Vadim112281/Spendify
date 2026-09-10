import {AUTH_SCREEN, type AuthScreen} from "@/pages/auth/types/authScreen";

export const AUTH_TAB_A11Y: Record<
	AuthScreen,
	{tabId: string; panelId: string}
> = {
	[AUTH_SCREEN.LOGIN]: {
		tabId: "auth-tab-login",
		panelId: "auth-panel-login",
	},
	[AUTH_SCREEN.REGISTER]: {
		tabId: "auth-tab-register",
		panelId: "auth-panel-register",
	},
};
