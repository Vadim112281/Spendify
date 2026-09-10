import {useMemo} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {resolveNavigationSlide} from "@/app/navigation/appTabs";
import {createNavigation} from "@/app/navigation/navigation";
import type {AppRoute} from "@/app/navigation/routes";
import type {RouteNavigateOptions} from "@/app/navigation/types/slideIntentTypes";

export const useRouteNavigation = () => {
	const navigate = useNavigate();
	const {pathname} = useLocation();

	return useMemo(
		() =>
			createNavigation({
				route: (path: AppRoute, options?: RouteNavigateOptions) => {
					const slide = resolveNavigationSlide(
						pathname,
						path,
						options?.slide,
					);
					const replace = options?.replace === true;

					if (!slide && !replace) {
						navigate(path);
						return;
					}

					navigate(path, {
						...(replace ? {replace: true} : {}),
						...(slide ? {state: {slide}} : {}),
					});
				},
			}),
		[navigate, pathname],
	);
};
