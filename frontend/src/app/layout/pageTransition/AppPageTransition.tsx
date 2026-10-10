import {motion, useAnimationControls} from "motion/react";
import {useLayoutEffect} from "react";

import {pageSlideTransition} from "@/app/layout/pageTransition/pageSlideTransitionConfig";
import {usePageSlideTransition} from "@/app/layout/pageTransition/usePageSlideTransition";
import {twx} from "@/shared/utils/twx";

const pageLayoutClassName = twx(
	"min-h-0 bg-e-bg px-20",
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

const panelFullClassName = twx(
	pagePanelScrollClassName,
	"relative h-full w-full shrink-0 overflow-hidden",
);

const panelSpacerClassName = twx(
	panelHalfClassName,
	"pointer-events-none invisible",
);

const restingTranslateX = (panel: "primary" | "secondary") =>
	panel === "secondary" ? "-50%" : "0%";

export const AppPageTransition = () => {
	const {
		displayOutlet,
		hasRestingViewport,
		restingPanel,
		transition,
		finishTransition,
	} = usePageSlideTransition();
	const slideControls = useAnimationControls();
	const isSliding = transition !== null;
	const useWideTrack = isSliding || hasRestingViewport;

	const slideForward = transition ? transition.direction > 0 : true;
	const leftOutlet =
		isSliding && transition
			? slideForward
				? transition.fromOutlet
				: transition.toOutlet
			: null;
	const rightOutlet =
		isSliding && transition
			? slideForward
				? transition.toOutlet
				: transition.fromOutlet
			: null;

	useLayoutEffect(() => {
		if (!transition) {
			return;
		}

		const transitionId = transition.id;
		const slideStartX = transition.direction > 0 ? "0%" : "-50%";
		const slideEndX = transition.direction > 0 ? "-50%" : "0%";
		let cancelled = false;

		const runSlide = async () => {
			slideControls.stop();
			await slideControls.set({x: slideStartX});
			await slideControls.start(
				{x: slideEndX},
				{...pageSlideTransition, velocity: 0},
			);

			if (!cancelled) {
				finishTransition(transitionId, transition);
			}
		};

		void runSlide();

		return () => {
			cancelled = true;
		};
	}, [transition, slideControls, finishTransition]);

	const restingX = restingTranslateX(restingPanel);

	return (
		<div className="fixed inset-0 overflow-hidden">
			<motion.div
				className={twx(
					"flex h-full min-h-0",
					useWideTrack ? "w-[200%]" : "w-full",
				)}
				animate={
					isSliding
						? slideControls
						: {x: hasRestingViewport ? restingX : "0%"}
				}
				initial={false}
				transition={isSliding ? undefined : {duration: 0}}
			>
				{isSliding && transition && leftOutlet && rightOutlet ? (
					<>
						<div
							key="primary"
							data-app-page-scroll
							className={panelHalfClassName}
						>
							{leftOutlet}
						</div>
						<div
							key="secondary"
							data-app-page-scroll
							className={panelHalfClassName}
						>
							{rightOutlet}
						</div>
					</>
				) : hasRestingViewport && restingPanel === "secondary" ? (
					<>
						<div key="primary" className={panelSpacerClassName} />
						<div
							key="secondary"
							data-app-page-scroll
							className={panelHalfClassName}
						>
							{displayOutlet}
						</div>
					</>
				) : hasRestingViewport ? (
					<div
						key="primary"
						data-app-page-scroll
						className={panelHalfClassName}
					>
						{displayOutlet}
					</div>
				) : (
					<div
						key="primary"
						data-app-page-scroll
						className={panelFullClassName}
					>
						{displayOutlet}
					</div>
				)}
			</motion.div>
		</div>
	);
};
