import {useReducedMotion} from "motion/react";
import {useState} from "react";
import {useLocation} from "react-router-dom";
import {AddButton} from "@/app/layout/AppTabBar/components/AddButton";
import {SlidingIndicator} from "@/app/layout/AppTabBar/components/SlidingIndicator";
import {TabLink} from "@/app/layout/AppTabBar/components/TabLink";
import {TAB_BAR_UI} from "@/app/layout/AppTabBar/tabBarUi";
import {
	getTabBarActiveSlotIndex,
	TAB_BAR_SLOTS,
} from "@/app/navigation/appTabs";
import {AddTransactionPopup} from "@/features/transactions/popups/AddTransactionPopup";
import {twx} from "@/shared/utils/twx";

export const AppTabBar = () => {
	const {pathname} = useLocation();
	const reducedMotion = useReducedMotion();
	const [addTransactionOpen, setAddTransactionOpen] = useState(false);
	const slotCount = TAB_BAR_SLOTS.length;
	const activeSlotIndex = getTabBarActiveSlotIndex(pathname);

	return (
		<>
			<nav
				className={twx(
					"pointer-events-none fixed inset-x-0 bottom-0 z-40 bg-transparent px-20",
					"pb-inset-bottom-tab",
				)}
				aria-label="Main menu"
			>
				<div
					className={twx(
						"pointer-events-auto mx-auto h-[58px] max-w-[340px] p-1",
						"rounded-full border border-white/10 bg-white/6",
						"shadow-[0_8px_28px_rgb(0_0_0/0.22)] backdrop-blur-2xl",
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
									return (
										<AddButton
											key="add"
											onPress={() => setAddTransactionOpen(true)}
										/>
									);
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

			<AddTransactionPopup
				open={addTransactionOpen}
				onOpenChange={setAddTransactionOpen}
			/>
		</>
	);
};
