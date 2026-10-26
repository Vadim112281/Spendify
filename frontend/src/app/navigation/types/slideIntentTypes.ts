export const SLIDE_INTENT = {
	FORWARD: "forward",
	BACK: "back",
} as const;

export type SlideIntent = (typeof SLIDE_INTENT)[keyof typeof SLIDE_INTENT];

export type RouteLocationState = {
	slide?: SlideIntent;
	focusTransactionId?: string;
};

export type RouteNavigateOptions = {
	slide?: SlideIntent;
	replace?: boolean;
	focusTransactionId?: string;
};
