import {twx} from "@/shared/utils/twx";

export const buildPagePanelClassNames = (includeTabBarPageInset: boolean) => {
	const pageLayoutClassName = twx(
		"min-h-0 bg-e-bg px-20",
		"pt-inset-top-page",
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
