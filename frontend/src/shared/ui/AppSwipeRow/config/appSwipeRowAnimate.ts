import {animate, type MotionValue} from "motion/react";

import {
	appSwipeRowCloseSpring,
	appSwipeRowOpenSpring,
} from "@/shared/ui/AppSwipeRow/config/appSwipeRowConfig";

export const getAppSwipeRowPanelTarget = (
	isOpen: boolean,
	openOffset: number,
) => (isOpen ? openOffset : 0);

export const animateAppSwipeRowPanel = (
	x: MotionValue<number>,
	target: number,
	openOffset: number,
	reducedMotion: boolean | null,
	velocity = 0,
) => {
	if (reducedMotion) {
		x.set(target);
		return;
	}

	const spring =
		target === openOffset ? appSwipeRowOpenSpring : appSwipeRowCloseSpring;
	void animate(x, target, velocity ? {...spring, velocity} : spring);
};
