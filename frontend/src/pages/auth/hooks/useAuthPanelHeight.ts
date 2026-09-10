import {useMemo, useRef} from "react";

import type {AuthScreen} from "@/pages/auth/types/authScreen";

export type AuthPanelMeasure = Record<AuthScreen, number>;

type UseAuthPanelHeightParams = {
	measure: AuthPanelMeasure | null;
	screen: AuthScreen;
};

export const useAuthPanelHeight = ({
	measure,
	screen,
}: UseAuthPanelHeightParams) => {
	const viewportRef = useRef<HTMLDivElement>(null);

	const height = useMemo(
		() => (measure ? measure[screen] : null),
		[measure, screen],
	);

	return {
		viewportRef,
		height,
	};
};
