import {useReducedMotion} from "motion/react";
import {
	type ReactElement,
	useCallback,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import {useLocation, useOutlet} from "react-router-dom";

import {PAGE_SLIDE_FALLBACK_MS} from "@/app/layout/pageTransition/pageSlideTransitionConfig";
import {getSlideDirection, readSlideIntent} from "@/app/navigation/slideIntent";

type PageTransition = {
	id: number;
	direction: number;
	fromOutlet: ReactElement;
	toOutlet: ReactElement;
};

type CommittedPage = {
	pathname: string;
	outlet: ReactElement | null;
};

type PendingNavigation = {
	shouldSlide: boolean;
	transition: PageTransition | null;
};

type NavigationRef = {
	committed: CommittedPage;
	nextTransitionId: number;
	pending: PendingNavigation | null;
};

export const usePageSlideTransition = () => {
	const location = useLocation();
	const outlet = useOutlet();
	const reducedMotion = useReducedMotion();
	const navigationRef = useRef<NavigationRef>({
		committed: {pathname: location.pathname, outlet: null},
		nextTransitionId: 0,
		pending: null,
	});
	const [transition, setTransition] = useState<PageTransition | null>(null);

	const completeActiveTransition = useCallback((transitionId: number) => {
		setTransition((current) => {
			if (current?.id !== transitionId) {
				return current;
			}

			return null;
		});
	}, []);

	const navigation = navigationRef.current;
	const committed = navigation.committed;
	const pathnameChanged = location.pathname !== committed.pathname;

	if (outlet && !pathnameChanged && !transition && !navigation.pending) {
		committed.outlet = outlet;
	}

	if (pathnameChanged && outlet) {
		const fromOutlet = committed.outlet;
		const toPath = location.pathname;
		const slideIntent = readSlideIntent(location.state);

		navigation.committed = {pathname: toPath, outlet};

		if (!reducedMotion && fromOutlet && slideIntent) {
			navigation.nextTransitionId += 1;
			navigation.pending = {
				shouldSlide: true,
				transition: {
					id: navigation.nextTransitionId,
					direction: getSlideDirection(slideIntent),
					fromOutlet,
					toOutlet: outlet,
				},
			};
		} else {
			navigation.pending = {
				shouldSlide: false,
				transition: null,
			};
		}
	}

	const pendingSlide = navigation.pending?.shouldSlide
		? navigation.pending.transition
		: null;
	const activeTransition = pendingSlide ?? transition;
	const activeTransitionId = activeTransition?.id ?? null;

	useLayoutEffect(() => {
		// Pending work is assigned during render; commit it before paint.
		void location.key;

		const pending = navigationRef.current.pending;
		if (!pending) {
			return;
		}

		navigationRef.current.pending = null;

		if (pending.shouldSlide && pending.transition) {
			setTransition(pending.transition);
			return;
		}

		setTransition(null);
	}, [location.key]);

	useLayoutEffect(() => {
		if (activeTransitionId === null) {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			completeActiveTransition(activeTransitionId);
		}, PAGE_SLIDE_FALLBACK_MS);

		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [activeTransitionId, completeActiveTransition]);

	const finishTransition = useCallback(
		(completedId: number) => {
			completeActiveTransition(completedId);
		},
		[completeActiveTransition],
	);

	return {
		outlet,
		transition: activeTransition,
		finishTransition,
	};
};
