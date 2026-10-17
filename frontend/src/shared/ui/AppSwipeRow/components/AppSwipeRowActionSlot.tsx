import {type MotionValue, motion, useTransform} from "motion/react";
import {AppSwipeRowActionButton} from "@/shared/ui/AppSwipeRow/components/AppSwipeRowActionButton";
import {getSwipeRowActionMotion} from "@/shared/ui/AppSwipeRow/config/appSwipeRowActionMotion";
import type {AppSwipeRowAction} from "@/shared/ui/AppSwipeRow/types/appSwipeRowTypes";
import {twx} from "@/shared/utils/twx";

type AppSwipeRowActionSlotProps = {
	action: AppSwipeRowAction;
	index: number;
	actionCount: number;
	offsetX: MotionValue<number>;
	openOffset: number;
	interactive: boolean;
	onPress: () => void;
};

export const AppSwipeRowActionSlot = ({
	action,
	index,
	actionCount,
	offsetX,
	openOffset,
	interactive,
	onPress,
}: AppSwipeRowActionSlotProps) => {
	const getMotion = (offset: number) =>
		getSwipeRowActionMotion(offset, openOffset, index, actionCount);

	const opacity = useTransform(offsetX, (value) => getMotion(value).opacity);
	const transform = useTransform(offsetX, (value) => {
		const {x: shiftX, scale} = getMotion(value);
		return `translate3d(${shiftX}px, 0, 0) scale(${scale})`;
	});

	return (
		<motion.div
			style={{opacity, transform}}
			className={twx(!interactive && "pointer-events-none")}
		>
			<AppSwipeRowActionButton
				label={action.label}
				tone={action.tone}
				onPress={onPress}
			/>
		</motion.div>
	);
};
