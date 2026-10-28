import {APP_ROUTES} from "@/app/navigation/routes";
import {twx} from "@/shared/utils/twx";

const PANEL_TAB_BAR_INSET_EXCLUDED = new Set<string>([
	APP_ROUTES.APP_HOME,
	APP_ROUTES.APP_TRANSACTIONS,
	APP_ROUTES.APP_CREATE_WALLET,
]);

const PANEL_TOP_INSET_EXCLUDED = new Set<string>([
	APP_ROUTES.APP_CREATE_WALLET,
]);

export const shouldIncludeTabBarPageInset = (pathname: string) =>
	!PANEL_TAB_BAR_INSET_EXCLUDED.has(pathname);

export const shouldIncludeTopPageInset = (pathname: string) =>
	!PANEL_TOP_INSET_EXCLUDED.has(pathname);

export const buildPagePanelClassNamesForPath = (pathname: string) =>
	buildPagePanelClassNames(
		shouldIncludeTabBarPageInset(pathname),
		shouldIncludeTopPageInset(pathname),
	);

export const buildPagePanelClassNames = (
	includeTabBarPageInset: boolean,
	includeTopPageInset: boolean,
) => {
	const pageLayoutClassName = twx(
		"min-h-0 bg-e-bg px-20",
		includeTopPageInset && "pt-inset-top-page",
		includeTabBarPageInset && "pb-tab-bar-layout",
	);

	const pagePanelScrollClassName = twx(
		pageLayoutClassName,
		"h-full overflow-x-hidden overflow-y-auto overscroll-contain touch-pan-y",
	);

	return {
		panelHalfClassName: twx(
			pagePanelScrollClassName,
			"relative w-1/2 shrink-0 overflow-hidden",
		),
		panelFullClassName: twx(
			pagePanelScrollClassName,
			"relative h-full w-full shrink-0 overflow-hidden",
		),
		panelSpacerClassName: twx(
			pagePanelScrollClassName,
			"relative w-1/2 shrink-0 overflow-hidden",
			"pointer-events-none invisible",
		),
	};
};
