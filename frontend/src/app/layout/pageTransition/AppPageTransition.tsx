import {motion, type Transition} from "motion/react";

import {usePageSlideTransition} from "@/app/layout/pageTransition/usePageSlideTransition";
import {twx} from "@/shared/lib/twx";

const pageSlideTransition: Transition = {
	duration: 0.42,
	ease: [0.22, 1, 0.36, 1],
};

const pageClassName = twx(
	"h-full overflow-y-auto bg-e-bg px-20",
	"pt-[max(20px,env(safe-area-inset-top))]",
	"pb-tab-bar-layout",
);

export const AppPageTransition = () => {
	const {outlet, transition, finishTransition} = usePageSlideTransition();

	if (!transition) {
		return <div className={pageClassName}>{outlet}</div>;
	}

	// Order panels left-to-right; swap when sliding back to a tab on the left.
	const pages =
		transition.direction > 0
			? [
					{key: transition.fromPath, outlet: transition.fromOutlet},
					{key: transition.toPath, outlet: transition.toOutlet},
				]
			: [
					{key: transition.toPath, outlet: transition.toOutlet},
					{key: transition.fromPath, outlet: transition.fromOutlet},
				];
	const slidesForward = transition.direction > 0;

	return (
		<div className="absolute inset-0 overflow-hidden">
			<motion.div
				key={transition.id}
				className="flex h-full"
				style={{width: "200%"}}
				initial={{x: slidesForward ? "0%" : "-50%"}}
				animate={{x: slidesForward ? "-50%" : "0%"}}
				transition={pageSlideTransition}
				onAnimationComplete={() => finishTransition(transition.id)}
			>
				{pages.map((page) => (
					<div
						key={page.key}
						className={twx(pageClassName, "w-1/2 shrink-0")}
					>
						{page.outlet}
					</div>
				))}
			</motion.div>
		</div>
	);
};
