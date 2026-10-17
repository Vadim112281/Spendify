import {type PanInfo, useMotionValue, useReducedMotion} from "motion/react";
import {useCallback, useEffect, useRef, useState} from "react";

import {
	animateAppSwipeRowPanel,
	getAppSwipeRowPanelTarget,
} from "@/shared/ui/AppSwipeRow/config/appSwipeRowAnimate";

const SNAP_OPEN_OFFSET_RATIO = 0.34;
const SNAP_OPEN_VELOCITY_X = -380;
const PANEL_POSITION_EPSILON = 0.5;

type UseAppSwipeRowPanelOptions = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	openOffset: number;
};

export const useAppSwipeRowPanel = ({
	isOpen,
	onOpenChange,
	openOffset,
}: UseAppSwipeRowPanelOptions) => {
	const reducedMotion = useReducedMotion();
	const x = useMotionValue(0);
	const isDraggingRef = useRef(false);
	const skipOpenSyncRef = useRef(false);
	const [isDragging, setIsDragging] = useState(false);

	const animateTo = useCallback(
		(target: number, velocity = 0) => {
			animateAppSwipeRowPanel(x, target, openOffset, reducedMotion, velocity);
		},
		[openOffset, reducedMotion, x],
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

	const onDragStart = useCallback(() => {
		x.stop();
		isDraggingRef.current = true;
		setIsDragging(true);
	}, [x]);

	const onDragEnd = useCallback(
		(_event: PointerEvent, info: PanInfo) => {
			isDraggingRef.current = false;
			setIsDragging(false);

			const offset = x.get();
			const shouldOpen =
				offset < openOffset * SNAP_OPEN_OFFSET_RATIO ||
				info.velocity.x < SNAP_OPEN_VELOCITY_X;
			const target = getAppSwipeRowPanelTarget(shouldOpen, openOffset);

			skipOpenSyncRef.current = true;
			onOpenChange(shouldOpen);
			animateTo(target, info.velocity.x);
		},
		[animateTo, onOpenChange, openOffset, x],
	);

	const requestClose = useCallback(() => {
		onOpenChange(false);
	}, [onOpenChange]);

	return {
		x,
		showActions: isOpen || isDragging,
		onDragStart,
		onDragEnd,
		requestClose,
	};
};
