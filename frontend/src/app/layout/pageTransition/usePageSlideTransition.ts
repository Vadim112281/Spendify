import {useReducedMotion} from "motion/react";
import {type ReactElement, useLayoutEffect, useRef, useState} from "react";
import {useLocation, useOutlet} from "react-router-dom";

import {
	readSlideIntent,
	getSlideDirection,
} from "@/app/navigation/slideIntent";

type PageTransition = {
	id: number;
	fromPath: string;
	toPath: string;
	direction: number;
	fromOutlet: ReactElement;
	toOutlet: ReactElement;
};

type PreviousPage = {
	pathname: string;
	outlet: ReactElement | null;
};

export const usePageSlideTransition = () => {
	// Current URL — tells us when the user switched tabs.
	const location = useLocation();
	// Active child route element (HomePage, OperationsPage, …).
	const outlet = useOutlet();
	// OS "reduce motion" — skip slide, switch tabs instantly.
	const reducedMotion = useReducedMotion();
	// Previous tab before the latest navigation — old page for the slide.
	const previousPageRef = useRef<PreviousPage>({
		pathname: location.pathname,
		outlet: null,
	});
	// Non-null while both pages are on screen and sliding.
	const [transition, setTransition] = useState<PageTransition | null>(null);

	if (outlet && location.pathname === previousPageRef.current.pathname) {
		previousPageRef.current.outlet = outlet;
	}

	useLayoutEffect(() => {
		const previous = previousPageRef.current;
		if (location.pathname === previous.pathname) {
			return;
		}

		const fromPath = previous.pathname;
		const fromOutlet = previous.outlet;
		const toPath = location.pathname;
		const slideIntent = readSlideIntent(location.state);

		previousPageRef.current = {pathname: toPath, outlet};

		// useOutlet() already returns the new page — fromOutlet is the one we cached.
		if (!reducedMotion && fromOutlet && outlet && slideIntent) {
			setTransition((current) => ({
				// Bump id so a stale onAnimationComplete from a fast tab tap is ignored.
				id: (current?.id ?? 0) + 1,
				fromPath,
				toPath,
				direction: getSlideDirection(slideIntent),
				fromOutlet,
				toOutlet: outlet,
			}));
		} else {
			setTransition(null);
		}
	}, [location.pathname, location.state, outlet, reducedMotion]);

	const finishTransition = (completedId: number) => {
		setTransition((current) =>
			current?.id === completedId ? null : current,
		);
	};

	return {
		outlet,
		transition,
		finishTransition,
	};
};
