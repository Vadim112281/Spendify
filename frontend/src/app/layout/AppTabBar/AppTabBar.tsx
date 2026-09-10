import {useReducedMotion} from "motion/react";
import {useLocation} from "react-router-dom";

import {getTabBarActiveSlotIndex, TAB_BAR_SLOTS} from "@/app/navigation/appTabs";
import {twx} from "@/shared/lib/twx";
import {AddButton} from "@/app/layout/AppTabBar/components/AddButton";
import {SlidingIndicator} from "@/app/layout/AppTabBar/components/SlidingIndicator";
import {TabLink} from "@/app/layout/AppTabBar/components/TabLink";
import {TAB_BAR_UI} from "@/app/layout/AppTabBar/tabBarUi";

export const AppTabBar = () => {
	const {pathname} = useLocation();
	const reducedMotion = useReducedMotion();
	const slotCount = TAB_BAR_SLOTS.length;
	const activeSlotIndex = getTabBarActiveSlotIndex(pathname);

	return (
		<nav
			className={twx(
				"pointer-events-none fixed inset-x-0 bottom-0 z-40 px-20",
				"pb-[max(12px,env(safe-area-inset-bottom))]",
			)}
			aria-label="Main menu"
		>
			<div
				className={twx(
					"pointer-events-auto mx-auto h-[58px] max-w-[340px] p-1",
					"rounded-full border border-white/10 bg-white/6 shadow-[0_10px_40px_rgb(0_0_0/0.42)]",
					"backdrop-blur-2xl",
				)}
			>
				<div className="relative h-full">
					<SlidingIndicator
						slotIndex={activeSlotIndex}
						slotCount={slotCount}
						reducedMotion={!!reducedMotion}
					/>

					<div
						className="relative z-1 grid h-full"
						style={{
							gridTemplateColumns: `repeat(${slotCount}, minmax(0, 1fr))`,
						}}
					>
						{TAB_BAR_SLOTS.map((slot) => {
							if (slot.kind === "add") {
								return <AddButton key="add" />;
							}

							const tabUi = TAB_BAR_UI[slot.route];

							return (
								<TabLink
									key={slot.route}
									route={slot.route}
									label={tabUi.label}
									end={slot.end}
									icon={tabUi.icon}
									currentPath={pathname}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</nav>
	);
};
