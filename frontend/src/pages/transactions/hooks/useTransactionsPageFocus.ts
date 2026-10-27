import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
	getPageSlideActive,
	subscribePageSlideIdle,
} from "@/app/layout/PageTransition/pageSlideActivity";
import {
	readFocusTransactionId,
	stripFocusTransactionId,
} from "@/app/navigation/readTransactionsFocus";
import type {Transaction} from "@/features/transactions/types/transactionTypes";

const FOCUS_SETTLE_AFTER_SLIDE_MS = 120;
const FOCUS_PULSE_AFTER_SCROLL_MS = 360;
const FOCUS_PULSE_MS = 4500;

type FocusPhase = "idle" | "prepared";

const prefersReducedMotion = (): boolean =>
	window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const createScheduledWorkTracker = () => {
	const timeoutIds: ReturnType<typeof window.setTimeout>[] = [];
	const animationFrameIds: number[] = [];

	const clearAll = () => {
		for (const timeoutId of timeoutIds) {
			window.clearTimeout(timeoutId);
		}
		for (const animationFrameId of animationFrameIds) {
			cancelAnimationFrame(animationFrameId);
		}
		timeoutIds.length = 0;
		animationFrameIds.length = 0;
	};

	return {
		setTimeout: (callback: () => void, delayMs: number) => {
			const timeoutId = window.setTimeout(callback, delayMs);
			timeoutIds.push(timeoutId);
		},
		requestAnimationFrame: (callback: FrameRequestCallback) => {
			animationFrameIds.push(requestAnimationFrame(callback));
		},
		clearAll,
	};
};

type UseTransactionsPageFocusOptions = {
	listReady: boolean;
	filteredTransactions: Transaction[];
	onFocusReceived?: () => void;
};

const usePendingFocusTransactionId = () => {
	const location = useLocation();
	const capturedRef = useRef<string | null | undefined>(undefined);

	if (capturedRef.current === undefined) {
		capturedRef.current = readFocusTransactionId(location.state) ?? null;
	}

	return capturedRef.current;
};

const scrollTransactionRowIntoView = (transactionId: string) => {
	const escapedId = CSS.escape(transactionId);
	const row = document.querySelector(`[data-transaction-id="${escapedId}"]`);

	row?.scrollIntoView({
		block: "center",
		behavior: prefersReducedMotion() ? "auto" : "smooth",
	});
};

const useTransactionsFocusPrepare = ({
	focusTransactionId,
	listReady,
	phase,
	onPrepared,
	onFocusReceived,
}: {
	focusTransactionId: string | null;
	listReady: boolean;
	phase: FocusPhase;
	onPrepared: () => void;
	onFocusReceived?: () => void;
}) => {
	const location = useLocation();
	const navigate = useNavigate();
	const preparedRef = useRef(false);

	useEffect(() => {
		if (!focusTransactionId || !listReady || phase !== "idle") {
			return;
		}

		const tracker = createScheduledWorkTracker();

		const runPrepare = () => {
			if (preparedRef.current) {
				return;
			}

			preparedRef.current = true;

			const nextState = stripFocusTransactionId(location.state);
			navigate(
				{
					pathname: location.pathname,
					search: location.search,
					hash: location.hash,
				},
				{replace: true, state: nextState ?? undefined},
			);
			onFocusReceived?.();
			onPrepared();
		};

		const settleMs = prefersReducedMotion() ? 0 : FOCUS_SETTLE_AFTER_SLIDE_MS;
		const schedulePrepare = () => {
			tracker.setTimeout(runPrepare, settleMs);
		};

		if (!getPageSlideActive()) {
			schedulePrepare();
		} else {
			const unsubscribe = subscribePageSlideIdle(schedulePrepare);
			return () => {
				unsubscribe();
				tracker.clearAll();
			};
		}

		return () => {
			tracker.clearAll();
		};
	}, [
		focusTransactionId,
		listReady,
		location.hash,
		location.pathname,
		location.search,
		location.state,
		navigate,
		onFocusReceived,
		onPrepared,
		phase,
	]);
};

const useTransactionsFocusHighlight = ({
	focusTransactionId,
	phase,
	focusTargetInList,
}: {
	focusTransactionId: string | null;
	phase: FocusPhase;
	focusTargetInList: boolean;
}) => {
	const [pulsingTransactionId, setPulsingTransactionId] = useState<
		string | null
	>(null);
	const highlightDoneRef = useRef(false);

	useEffect(() => {
		if (
			!focusTransactionId ||
			phase !== "prepared" ||
			!focusTargetInList ||
			highlightDoneRef.current
		) {
			return;
		}

		highlightDoneRef.current = true;

		const tracker = createScheduledWorkTracker();
		const pulseDelayMs = prefersReducedMotion()
			? 0
			: FOCUS_PULSE_AFTER_SCROLL_MS;

		// Two frames so the list row exists after filter/layout from onFocusReceived.
		tracker.requestAnimationFrame(() => {
			tracker.requestAnimationFrame(() => {
				scrollTransactionRowIntoView(focusTransactionId);

				tracker.setTimeout(() => {
					setPulsingTransactionId(focusTransactionId);

					tracker.setTimeout(() => {
						setPulsingTransactionId(null);
					}, FOCUS_PULSE_MS);
				}, pulseDelayMs);
			});
		});

		return () => {
			tracker.clearAll();
		};
	}, [focusTargetInList, focusTransactionId, phase]);

	return pulsingTransactionId;
};

export const useTransactionsPageFocus = ({
	listReady,
	filteredTransactions,
	onFocusReceived,
}: UseTransactionsPageFocusOptions) => {
	const focusTransactionId = usePendingFocusTransactionId();
	const [phase, setPhase] = useState<FocusPhase>("idle");
	const onPrepared = useCallback(() => {
		setPhase("prepared");
	}, []);

	const focusTargetInList = useMemo(
		() =>
			focusTransactionId
				? filteredTransactions.some(
						(transaction) => transaction.transactionId === focusTransactionId,
					)
				: false,
		[filteredTransactions, focusTransactionId],
	);

	useTransactionsFocusPrepare({
		focusTransactionId,
		listReady,
		phase,
		onPrepared,
		onFocusReceived,
	});

	const pulsingTransactionId = useTransactionsFocusHighlight({
		focusTransactionId,
		phase,
		focusTargetInList,
	});

	return {pulsingTransactionId};
};
