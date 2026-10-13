import {motion} from "motion/react";

import {addButtonSpring} from "@/app/layout/AppTabBar/config/tabBarMotion";
import {twx} from "@/shared/utils/twx";
import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";

type AddButtonProps = {
	onPress?: () => void;
};

export const AddButton = ({onPress}: AddButtonProps) => (
	<motion.button
		type="button"
		aria-label="Add transaction"
		title="Add transaction"
		disabled={!onPress}
		onClick={onPress}
		className={twx(
			"flex min-h-44 min-w-44 items-center justify-center",
			"rounded-full border border-white/12 bg-e-btn-bg text-e-btn-fg shadow-e-btn",
			"transition-(transform,box-shadow) duration-200",
			"hover:-translate-y-px hover:shadow-[0_6px_18px_-6px_rgb(0_0_0/0.35)]",
			"active:translate-y-0 active:scale-95",
			"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-zinc",
			"disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0",
		)}
		whileTap={onPress ? {scale: 0.94} : undefined}
		transition={addButtonSpring}
	>
		<AppDecorativeIcon width={22} height={22} strokeWidth={2}>
			<path d="M12 5v14M5 12h14" />
		</AppDecorativeIcon>
	</motion.button>
);
