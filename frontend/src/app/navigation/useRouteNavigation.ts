import {useMemo} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {resolveNavigationSlide} from "@/app/navigation/appTabs";
import {createNavigation} from "@/app/navigation/navigation";
import type {AppRoute} from "@/app/navigation/routes";
import type {
	RouteLocationState,
	RouteNavigateOptions,
} from "@/app/navigation/types/slideIntentTypes";

export const useRouteNavigation = () => {
	const navigate = useNavigate();
	const {pathname} = useLocation();

	return useMemo(
		() =>
			createNavigation({
				route: (path: AppRoute, options?: RouteNavigateOptions) => {
					const slide = resolveNavigationSlide(pathname, path, options?.slide);
					const replace = options?.replace === true;
					const state: RouteLocationState = {};

					if (slide) {
						state.slide = slide;
					}

					if (options?.focusTransactionId) {
						state.focusTransactionId = options.focusTransactionId;
					}

					if (options?.loginFold) {
						state.loginFold = options.loginFold;
					}

					if (options?.loginFoldLayout) {
						state.loginFoldLayout = options.loginFoldLayout;
					}

					const hasState =
						state.slide !== undefined ||
						state.focusTransactionId !== undefined ||
						state.loginFold !== undefined ||
						state.loginFoldLayout !== undefined;

					if (!hasState && !replace) {
						navigate(path);
						return;
					}

					navigate(path, {
						...(replace ? {replace: true} : {}),
						...(hasState ? {state} : {}),
					});
				},
			}),
		[navigate, pathname],
	);
};
