import {motion, useTransform} from "motion/react";
import type {ReactNode} from "react";
import {AppSwipeRowActionSlot} from "@/shared/ui/AppSwipeRow/components/AppSwipeRowActionSlot";
import {getSwipeRowCardLift} from "@/shared/ui/AppSwipeRow/config/appSwipeRowActionMotion";
import {getAppSwipeRowRevealWidth} from "@/shared/ui/AppSwipeRow/config/appSwipeRowConfig";
import {useAppSwipeRowPanel} from "@/shared/ui/AppSwipeRow/hooks/useAppSwipeRowPanel";
import type {AppSwipeRowAction} from "@/shared/ui/AppSwipeRow/types/appSwipeRowTypes";
import {twx} from "@/shared/utils/twx";

export type {AppSwipeRowAction} from "@/shared/ui/AppSwipeRow/types/appSwipeRowTypes";

type AppSwipeRowProps = {
	children: ReactNode;
	actions: AppSwipeRowAction[];
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	className?: string;
	cardClassName?: string;
	focusHighlighted?: boolean;
};

export const AppSwipeRow = ({
	children,
	actions,
	isOpen,
	onOpenChange,
	className,
	cardClassName,
	focusHighlighted = false,
}: AppSwipeRowProps) => {
	const openOffset = -getAppSwipeRowRevealWidth(actions.length);
	const canSwipe = actions.length > 0;

	const {x, showActions, onDragStart, onDragEnd, requestClose} =
		useAppSwipeRowPanel({
			isOpen,
			onOpenChange,
			openOffset,
		});

	const cardLift = useTransform(x, (offsetX) =>
		getSwipeRowCardLift(offsetX, openOffset),
	);
	const cardBorderColor = useTransform(
		cardLift,
		(lift) => `rgb(255 255 255 / ${0.1 + lift * 0.06})`,
	);

	return (
		<div className={twx("relative overflow-x-clip", className)}>
			<div
				className="absolute inset-y-0 right-0 flex items-center justify-end gap-8"
				aria-hidden={!showActions}
			>
				{actions.map((action, index) => (
					<AppSwipeRowActionSlot
						key={action.id}
						action={action}
						index={index}
						actionCount={actions.length}
						offsetX={x}
						openOffset={openOffset}
						interactive={showActions}
						onPress={() => {
							action.onPress();
							requestClose();
						}}
					/>
				))}
			</div>

			<motion.div
				className="relative z-10 w-full touch-pan-y"
				style={{x}}
				drag={canSwipe ? "x" : false}
				dragDirectionLock={canSwipe}
				dragConstraints={{left: openOffset, right: 0}}
				dragElastic={{left: 0.03, right: 0.008}}
				onDragStart={canSwipe ? onDragStart : undefined}
				onDragEnd={canSwipe ? onDragEnd : undefined}
			>
				<motion.div
					className={twx(
						"relative rounded-14 e-home-stat-surface",
						focusHighlighted && "transaction-row-focus-pulse",
						cardClassName,
					)}
					style={{borderColor: cardBorderColor}}
				>
					{focusHighlighted ? (
						<span
							aria-hidden
							className="pointer-events-none absolute inset-0 z-20 rounded-14 transaction-row-focus-ring"
						/>
					) : null}
					{children}
				</motion.div>
			</motion.div>
		</div>
	);
};
