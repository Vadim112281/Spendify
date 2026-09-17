import type {Transition} from "motion/react";

export const PAGE_SLIDE_DURATION_MS = 420;
export const PAGE_SLIDE_DURATION_S = PAGE_SLIDE_DURATION_MS / 1000;
export const PAGE_SLIDE_FALLBACK_MS = PAGE_SLIDE_DURATION_MS + 80;

export const pageSlideTransition: Transition = {
	duration: PAGE_SLIDE_DURATION_S,
	ease: [0.22, 1, 0.36, 1],
};
