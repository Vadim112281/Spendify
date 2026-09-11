import {APP_ROUTES} from "@/app/navigation/routes";
import {
	SLIDE_INTENT,
	type SlideIntent,
} from "@/app/navigation/types/slideIntentTypes";

export type AppTabRoute =
	| typeof APP_ROUTES.APP_HOME
	| typeof APP_ROUTES.APP_OPERATIONS
	| typeof APP_ROUTES.APP_ANALYTICS
	| typeof APP_ROUTES.APP_PROFILE;

type AppTabSlot = {
	kind: "tab";
	route: AppTabRoute;
	end?: boolean;
};

type AddTabSlot = {
	kind: "add";
};

export type TabBarSlot = AppTabSlot | AddTabSlot;

export const TAB_BAR_SLOTS: TabBarSlot[] = [
	{kind: "tab", route: APP_ROUTES.APP_HOME, end: true},
	{kind: "tab", route: APP_ROUTES.APP_OPERATIONS},
	{kind: "add"},
	{kind: "tab", route: APP_ROUTES.APP_ANALYTICS},
	{kind: "tab", route: APP_ROUTES.APP_PROFILE},
];

const isTabSlot = (slot: TabBarSlot): slot is AppTabSlot => slot.kind === "tab";

const TAB_SLOTS = TAB_BAR_SLOTS.filter(isTabSlot);

const matchesTabRoute = (pathname: string, route: AppTabRoute): boolean =>
	pathname.startsWith(route);

const findActiveTabSlot = (pathname: string): AppTabSlot | undefined =>
	TAB_SLOTS.find((slot) => matchesTabRoute(pathname, slot.route));

const getTabOrderIndex = (pathname: string): number => {
	const tab = findActiveTabSlot(pathname);
	return tab ? TAB_SLOTS.indexOf(tab) : -1;
};

const getTabSlideIntentFromIndices = (
	fromIndex: number,
	toIndex: number,
): SlideIntent => {
	if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
		return SLIDE_INTENT.FORWARD;
	}

	return toIndex > fromIndex ? SLIDE_INTENT.FORWARD : SLIDE_INTENT.BACK;
};

export const getTabBarActiveSlotIndex = (pathname: string): number => {
	const tab = findActiveTabSlot(pathname);
	return tab ? TAB_BAR_SLOTS.indexOf(tab) : -1;
};

export const getTabSlideIntent = (
	fromPath: string,
	toPath: string,
): SlideIntent =>
	getTabSlideIntentFromIndices(
		getTabOrderIndex(fromPath),
		getTabOrderIndex(toPath),
	);

export const resolveNavigationSlide = (
	fromPath: string,
	toPath: string,
	explicit?: SlideIntent,
): SlideIntent | undefined => {
	if (explicit) {
		return explicit;
	}

	const fromIndex = getTabOrderIndex(fromPath);
	const toIndex = getTabOrderIndex(toPath);

	if (fromIndex === -1 || toIndex === -1) {
		return undefined;
	}

	return getTabSlideIntentFromIndices(fromIndex, toIndex);
};
