import {motion} from "motion/react";

import {addButtonSpring} from "@/app/layout/AppTabBar/config/tabBarMotion";
import {twx} from "@/shared/lib/twx";
import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";

export const AddButton = () => (
	<motion.button
		type="button"
		aria-label="Add transaction"
		title="Add transaction"
		disabled
		className={twx(
			"flex items-center justify-center text-e-zinc/42 opacity-50",
			"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-zinc",
		)}
		transition={addButtonSpring}
	>
		<AppDecorativeIcon width={24} height={24} strokeWidth={1.9}>
			<path d="M12 5v14M5 12h14" />
		</AppDecorativeIcon>
	</motion.button>
);
