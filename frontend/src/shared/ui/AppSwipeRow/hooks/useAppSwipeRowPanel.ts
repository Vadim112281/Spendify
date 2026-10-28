import {useMotionValue, useReducedMotion} from "motion/react";
import {
	type PointerEvent as ReactPointerEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

import {
	animateAppSwipeRowPanel,
	getAppSwipeRowPanelTarget,
} from "@/shared/ui/AppSwipeRow/config/appSwipeRowAnimate";

const SNAP_OPEN_OFFSET_RATIO = 0.34;
const SNAP_OPEN_VELOCITY_X = -380;
const PANEL_POSITION_EPSILON = 0.5;
const AXIS_LOCK_THRESHOLD_PX = 10;

type DragAxis = "pending" | "x" | "y";

type PointerSession = {
	pointerId: number;
	startX: number;
	startY: number;
	startOffset: number;
	axis: DragAxis;
	lastX: number;
	lastTime: number;
	velocityX: number;
};

type UseAppSwipeRowPanelOptions = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	openOffset: number;
	enabled?: boolean;
};

const clampPanelOffset = (value: number, openOffset: number) =>
	Math.min(0, Math.max(openOffset, value));

export const useAppSwipeRowPanel = ({
	isOpen,
	onOpenChange,
	openOffset,
	enabled = true,
}: UseAppSwipeRowPanelOptions) => {
	const reducedMotion = useReducedMotion();
	const x = useMotionValue(0);
	const isDraggingRef = useRef(false);
	const skipOpenSyncRef = useRef(false);
	const pointerSessionRef = useRef<PointerSession | null>(null);
	const [isDragging, setIsDragging] = useState(false);

	const animateTo = useCallback(
		(target: number, velocity = 0) => {
			animateAppSwipeRowPanel(x, target, openOffset, reducedMotion, velocity);
		},
		[openOffset, reducedMotion, x],
	);

	const finishHorizontalDrag = useCallback(
		(velocityX: number) => {
			isDraggingRef.current = false;
			setIsDragging(false);

			const offset = x.get();
			const shouldOpen =
				offset < openOffset * SNAP_OPEN_OFFSET_RATIO ||
				velocityX < SNAP_OPEN_VELOCITY_X;
			const target = getAppSwipeRowPanelTarget(shouldOpen, openOffset);

			skipOpenSyncRef.current = true;
			onOpenChange(shouldOpen);
			animateTo(target, velocityX);
		},
		[animateTo, onOpenChange, openOffset, x],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: motion value `x` is stable; sync on open state only
	useEffect(() => {
		if (isDraggingRef.current) {
			return;
		}

		if (skipOpenSyncRef.current) {
			skipOpenSyncRef.current = false;
			return;
		}

		const target = getAppSwipeRowPanelTarget(isOpen, openOffset);
		if (Math.abs(x.get() - target) < PANEL_POSITION_EPSILON) {
			return;
		}

		animateTo(target);
	}, [animateTo, isOpen, openOffset]);

	const beginHorizontalDrag = useCallback(
		(event: ReactPointerEvent<HTMLDivElement>, session: PointerSession) => {
			x.stop();
			isDraggingRef.current = true;
			setIsDragging(true);
			session.axis = "x";
			event.currentTarget.setPointerCapture(event.pointerId);
		},
		[x],
	);

	const onPointerDown = useCallback(
		(event: ReactPointerEvent<HTMLDivElement>) => {
			if (!enabled || event.button !== 0) {
				return;
			}

			pointerSessionRef.current = {
				pointerId: event.pointerId,
				startX: event.clientX,
				startY: event.clientY,
				startOffset: x.get(),
				axis: "pending",
				lastX: event.clientX,
				lastTime: event.timeStamp,
				velocityX: 0,
			};
		},
		[enabled, x],
	);

	const onPointerMove = useCallback(
		(event: ReactPointerEvent<HTMLDivElement>) => {
			const session = pointerSessionRef.current;
			if (!session || event.pointerId !== session.pointerId) {
				return;
			}

			const deltaX = event.clientX - session.startX;
			const deltaY = event.clientY - session.startY;

			if (session.axis === "pending") {
				if (
					Math.abs(deltaX) < AXIS_LOCK_THRESHOLD_PX &&
					Math.abs(deltaY) < AXIS_LOCK_THRESHOLD_PX
				) {
					return;
				}

				if (Math.abs(deltaY) >= Math.abs(deltaX)) {
					session.axis = "y";
					pointerSessionRef.current = null;
					return;
				}

				beginHorizontalDrag(event, session);
			}

			if (session.axis !== "x") {
				return;
			}

			event.preventDefault();

			const elapsedMs = event.timeStamp - session.lastTime;
			if (elapsedMs > 0) {
				session.velocityX =
					((event.clientX - session.lastX) / elapsedMs) * 1000;
			}
			session.lastX = event.clientX;
			session.lastTime = event.timeStamp;

			x.set(clampPanelOffset(session.startOffset + deltaX, openOffset));
		},
		[beginHorizontalDrag, openOffset, x],
	);

	const endPointerSession = useCallback(
		(event: ReactPointerEvent<HTMLDivElement>) => {
			const session = pointerSessionRef.current;
			if (!session || event.pointerId !== session.pointerId) {
				return;
			}

			pointerSessionRef.current = null;

			if (session.axis === "x") {
				if (event.currentTarget.hasPointerCapture(event.pointerId)) {
					event.currentTarget.releasePointerCapture(event.pointerId);
				}
				finishHorizontalDrag(session.velocityX);
			}
		},
		[finishHorizontalDrag],
	);

	const onPointerUp = useCallback(
		(event: ReactPointerEvent<HTMLDivElement>) => {
			endPointerSession(event);
		},
		[endPointerSession],
	);

	const onPointerCancel = useCallback(
		(event: ReactPointerEvent<HTMLDivElement>) => {
			endPointerSession(event);
		},
		[endPointerSession],
	);

	const requestClose = useCallback(() => {
		onOpenChange(false);
	}, [onOpenChange]);

	return {
		x,
		showActions: isOpen || isDragging,
		onPointerDown,
		onPointerMove,
		onPointerUp,
		onPointerCancel,
		requestClose,
	};
};
