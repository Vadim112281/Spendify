import {useMemo} from "react";

import {createNavigation} from "@/app/navigation/navigation";
import {AUTH_SCREEN, type AuthScreen} from "@/pages/auth/config/authScreen";
import {useScreenTransition} from "@/shared/lib/useScreenTransition";

export const useAuthNavigation = (initial: AuthScreen = AUTH_SCREEN.LOGIN) => {
	const {screen, isTransitioning, goTo, onTransitionComplete} =
		useScreenTransition(initial);

	const navigation = useMemo(
		() => createNavigation({auth: goTo}),
		[goTo],
	);

	return {
		screen,
		isTransitioning,
		onTransitionComplete,
		navigation,
	};
};
