import {motion} from "motion/react";
import type {ReactNode} from "react";

import {tabBarIconSpring} from "@/app/layout/AppTabBar/config/tabBarMotion";

export type TabIconActiveProps = {
	active: boolean;
};

type TabIconProps = TabIconActiveProps & {
	children: ReactNode;
};

export const TabIcon = ({children, active}: TabIconProps) => (
	<motion.span
		className="relative z-1 grid size-24 place-items-center"
		aria-hidden="true"
		animate={{scale: active ? 1.04 : 1}}
		transition={tabBarIconSpring}
	>
		{children}
	</motion.span>
);
