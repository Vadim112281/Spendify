import {motion} from "motion/react";

import {twx} from "@/shared/lib/twx";
import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";
import {addButtonSpring} from "@/app/layout/AppTabBar/config/tabBarMotion";

export const AddButton = () => (
	<motion.button
		type="button"
		aria-label="Add transaction"
		title="Add transaction"
		className={twx(
			"relative z-1 flex h-full w-full items-center justify-center",
			"text-e-heading/42",
			"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-heading",
		)}
		whileTap={{scale: 0.92}}
		transition={addButtonSpring}
	>
		<AppDecorativeIcon width={24} height={24} strokeWidth={1.9}>
			<path d="M12 5v14M5 12h14" />
		</AppDecorativeIcon>
	</motion.button>
);
