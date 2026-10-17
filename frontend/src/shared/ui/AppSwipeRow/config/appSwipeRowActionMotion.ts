const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const smoothstep = (value: number) => {
	const t = clamp01(value);
	return t * t * (3 - 2 * t);
};

const getSwipeProgress = (offsetX: number, openOffset: number) => {
	if (openOffset === 0) {
		return 0;
	}
	return smoothstep(offsetX / openOffset);
};

export type SwipeRowActionMotion = {
	opacity: number;
	scale: number;
	x: number;
};

export const getSwipeRowActionMotion = (
	offsetX: number,
	openOffset: number,
	index: number,
	actionCount: number,
): SwipeRowActionMotion => {
	const progress = getSwipeProgress(offsetX, openOffset);
	const trailingRank = actionCount - 1 - index;
	const reveal = smoothstep(clamp01((progress - trailingRank * 0.06) / 0.88));

	return {
		opacity: reveal,
		scale: 0.94 + reveal * 0.06,
		x: (1 - reveal) * (8 + trailingRank * 4),
	};
};

export const getSwipeRowCardLift = (offsetX: number, openOffset: number) =>
	getSwipeProgress(offsetX, openOffset);
