import type {Transition} from "motion/react";

export const APP_SWIPE_ROW_ACTION_SIZE = 44;
export const APP_SWIPE_ROW_ACTION_GAP = 8;
export const APP_SWIPE_ROW_ACTIONS_LEADING_GAP = 6;
export const APP_SWIPE_ROW_ACTIONS_TRAILING_GAP = 0;

export const getAppSwipeRowRevealWidth = (actionCount: number) => {
	if (actionCount === 0) {
		return 0;
	}

	return (
		APP_SWIPE_ROW_ACTIONS_LEADING_GAP +
		APP_SWIPE_ROW_ACTIONS_TRAILING_GAP +
		actionCount * APP_SWIPE_ROW_ACTION_SIZE +
		(actionCount - 1) * APP_SWIPE_ROW_ACTION_GAP
	);
};

export const appSwipeRowOpenSpring: Transition = {
	type: "spring",
	stiffness: 430,
	damping: 44,
	mass: 0.94,
};

export const appSwipeRowCloseSpring: Transition = {
	type: "spring",
	stiffness: 500,
	damping: 48,
	mass: 0.86,
};
