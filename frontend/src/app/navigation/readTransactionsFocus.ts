import type {RouteLocationState} from "@/app/navigation/types/slideIntentTypes";

export const readFocusTransactionId = (state: unknown): string | undefined => {
	if (!state || typeof state !== "object") {
		return undefined;
	}

	const focusTransactionId = (state as RouteLocationState).focusTransactionId;

	if (
		typeof focusTransactionId !== "string" ||
		focusTransactionId.length === 0
	) {
		return undefined;
	}

	return focusTransactionId;
};

export const stripFocusTransactionId = (
	state: unknown,
): RouteLocationState | null => {
	if (!state || typeof state !== "object") {
		return null;
	}

	const current = state as RouteLocationState;

	if (!current.focusTransactionId) {
		return current;
	}

	const {focusTransactionId: _removed, ...rest} = current;
	return Object.keys(rest).length > 0 ? rest : null;
};
