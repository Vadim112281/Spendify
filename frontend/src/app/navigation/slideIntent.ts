import {
	SLIDE_INTENT,
	type RouteLocationState,
	type SlideIntent,
} from "@/app/navigation/types/slideIntentTypes";

export const readSlideIntent = (state: unknown): SlideIntent | null => {
	if (!state || typeof state !== "object") {
		return null;
	}

	const slide = (state as RouteLocationState).slide;

	if (slide === SLIDE_INTENT.FORWARD || slide === SLIDE_INTENT.BACK) {
		return slide;
	}

	return null;
};

export const getSlideDirection = (slide: SlideIntent): 1 | -1 =>
	slide === SLIDE_INTENT.FORWARD ? 1 : -1;
