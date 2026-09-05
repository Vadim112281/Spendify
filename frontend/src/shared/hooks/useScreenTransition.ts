import {useCallback, useState} from "react";

export const useScreenTransition = <T extends string>(initial: T) => {
	const [screen, setScreen] = useState<T>(initial);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const goTo = useCallback(
		(next: T) => {
			if (next === screen || isTransitioning) {
				return;
			}

			setScreen(next);
			setIsTransitioning(true);
		},
		[isTransitioning, screen],
	);

	const onTransitionComplete = useCallback(() => {
		setIsTransitioning(false);
	}, []);

	return {
		screen,
		isTransitioning,
		goTo,
		onTransitionComplete,
	};
};
