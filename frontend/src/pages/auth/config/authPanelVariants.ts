import type {Transition} from "motion/react";

const easePage = [0.76, 0, 0.24, 1] as const;

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

export const authPanelPageTransition: Transition = {
	x: {type: "spring", stiffness: 300, damping: 30, mass: 0.95},
	opacity: {duration: 0.38, ease: easePage},
	scale: {duration: 0.42, ease: easePage},
};

export const authPanelFadeTransition: Transition = {
	duration: 0.2,
	ease: easePage,
};

export const authPanelHeightTransition = {
	type: "spring",
	stiffness: 360,
	damping: 34,
	mass: 0.9,
} as const;
