import {motion, useAnimationControls} from "motion/react";
import {useLayoutEffect} from "react";

import {pageSlideTransition} from "@/app/layout/pageTransition/pageSlideTransitionConfig";
import {usePageSlideTransition} from "@/app/layout/pageTransition/usePageSlideTransition";
import {twx} from "@/shared/lib/twx";

const pageLayoutClassName = twx(
	"bg-e-bg px-20",
	"pt-[max(20px,env(safe-area-inset-top))]",
	"pb-tab-bar-layout",
);

const pagePanelScrollClassName = twx(
	pageLayoutClassName,
	"h-full overflow-x-hidden overflow-y-auto overscroll-contain touch-pan-y",
);

const panelHalfClassName = twx(
	pagePanelScrollClassName,
	"relative w-1/2 shrink-0 overflow-hidden",
);

export const AppPageTransition = () => {
	const {outlet, transition, finishTransition} = usePageSlideTransition();
	const slideControls = useAnimationControls();
	const isSliding = transition !== null;

	const slideForward = transition ? transition.direction > 0 : true;
	const leftOutlet =
		isSliding && transition
			? slideForward
				? transition.fromOutlet
				: transition.toOutlet
			: outlet;
	const rightOutlet =
		isSliding && transition
			? slideForward
				? transition.toOutlet
				: transition.fromOutlet
			: null;

	useLayoutEffect(() => {
		if (!transition) {
			void slideControls.set({x: "0%"});
			return;
		}

		const transitionId = transition.id;
		const slideStartX = transition.direction > 0 ? "0%" : "-50%";
		const slideEndX = transition.direction > 0 ? "-50%" : "0%";
		let cancelled = false;

		const runSlide = async () => {
			await slideControls.set({x: slideStartX});
			await slideControls.start({x: slideEndX}, pageSlideTransition);

			if (!cancelled) {
				finishTransition(transitionId);
			}
		};

		void runSlide();

		return () => {
			cancelled = true;
		};
	}, [transition, slideControls, finishTransition]);

	return (
		<div className="fixed inset-0 overflow-hidden">
			<motion.div
				className="flex h-full"
				style={{width: isSliding ? "200%" : "100%"}}
				animate={slideControls}
				initial={false}
			>
				<div
					key="primary"
					className={
						isSliding
							? panelHalfClassName
							: twx(pagePanelScrollClassName, "w-full")
					}
				>
					{leftOutlet}
				</div>
				{isSliding && rightOutlet ? (
					<div key="secondary" className={panelHalfClassName}>
						{rightOutlet}
					</div>
				) : null}
			</motion.div>
		</div>
	);
};
