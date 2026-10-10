import type {Transition} from "motion/react";

export const authPanelOffLeft = {
	x: "-100%",
	opacity: 0.55,
	scale: 0.96,
	zIndex: 1,
};

export const authPanelOffRight = {
	x: "100%",
	opacity: 0.55,
	scale: 0.96,
	zIndex: 1,
};

export const authPanelCenter = {
	x: 0,
	opacity: 1,
	scale: 1,
	zIndex: 2,
};

export const authPanelFadeHidden = {
	opacity: 0,
	zIndex: 1,
};

export const authPanelFadeVisible = {
	opacity: 1,
	zIndex: 2,
};

const authPanelMotionSpring = {
	type: "spring",
	stiffness: 300,
	damping: 30,
	mass: 0.95,
} as const;

export const authPanelPageTransition: Transition = {
	x: authPanelMotionSpring,
	opacity: {type: "spring", stiffness: 380, damping: 36, mass: 0.85},
	scale: authPanelMotionSpring,
};

export const authPanelFadeTransition: Transition = {
	opacity: {type: "spring", stiffness: 520, damping: 42, mass: 0.7},
};

export const authPanelHeightTransition = {
	type: "spring",
	stiffness: 360,
	damping: 34,
	mass: 0.9,
} as const;
