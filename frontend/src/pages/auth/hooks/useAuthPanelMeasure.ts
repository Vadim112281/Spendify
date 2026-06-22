import {type RefObject, useLayoutEffect, useRef} from "react";

import type {AuthPanelMeasure} from "@/pages/auth/hooks/useAuthPanelHeight";

type UseAuthPanelMeasureParams = {
	onMeasure: (measure: AuthPanelMeasure) => void;
};

type UseAuthPanelMeasureResult = {
	loginRef: RefObject<HTMLDivElement | null>;
	registerRef: RefObject<HTMLDivElement | null>;
};

export const useAuthPanelMeasure = ({
	onMeasure,
}: UseAuthPanelMeasureParams): UseAuthPanelMeasureResult => {
	const loginRef = useRef<HTMLDivElement>(null);
	const registerRef = useRef<HTMLDivElement>(null);
	const lastMeasureRef = useRef<AuthPanelMeasure | null>(null);

	useLayoutEffect(() => {
		const measure = () => {
			const login = loginRef.current?.offsetHeight ?? 0;
			const register = registerRef.current?.offsetHeight ?? 0;

			if (login <= 0 || register <= 0) {
				return;
			}

			const last = lastMeasureRef.current;
			if (last?.login === login && last?.register === register) {
				return;
			}

			const next = {login, register};
			lastMeasureRef.current = next;
			onMeasure(next);
		};

		measure();

		const observer = new ResizeObserver(measure);
		const loginEl = loginRef.current;
		const registerEl = registerRef.current;

		if (loginEl) {
			observer.observe(loginEl);
		}
		if (registerEl) {
			observer.observe(registerEl);
		}

		return () => observer.disconnect();
	}, [onMeasure]);

	return {loginRef, registerRef};
};
