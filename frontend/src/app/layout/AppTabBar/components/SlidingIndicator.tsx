import {motion} from "motion/react";

import {twx} from "@/shared/lib/twx";
import {tabBarSpring} from "@/app/layout/AppTabBar/config/tabBarMotion";

type SlidingIndicatorProps = {
	slotIndex: number;
	slotCount: number;
	reducedMotion: boolean;
};

const slotPosition = (slotIndex: number, slotCount: number) => ({
	left: `${(slotIndex / slotCount) * 100}%`,
	width: `${100 / slotCount}%`,
});

const SlotPill = ({className}: {className?: string}) => (
	<div
		className={twx(
			"h-full w-full rounded-full bg-white/16",
			"ring-1 ring-inset ring-white/14",
			className,
		)}
	/>
);

const indicatorClass =
	"pointer-events-none absolute top-0.5 bottom-0.5 z-0 p-0.5";

export const SlidingIndicator = ({
	slotIndex,
	slotCount,
	reducedMotion,
}: SlidingIndicatorProps) => {
	if (slotIndex < 0) {
		return null;
	}

	return (
	<motion.div
		className={indicatorClass}
		initial={false}
		animate={slotPosition(slotIndex, slotCount)}
		transition={reducedMotion ? {duration: 0} : tabBarSpring}
		aria-hidden
	>
		<SlotPill />
	</motion.div>
	);
};
