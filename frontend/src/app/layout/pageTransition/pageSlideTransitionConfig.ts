import type {Transition} from "motion/react";

// Safety net if spring onComplete is missed.
export const PAGE_SLIDE_FALLBACK_MS = 480;

// Critically damped page push — snappy, no endpoint overshoot (Apple-style).
export const pageSlideTransition: Transition = {
	type: "spring",
	stiffness: 480,
	damping: 44,
	mass: 1,
};
