import {useCallback, useMemo} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {LoginFoldIntoMark} from "@/app/layout/LoginFold/LoginFoldIntoMark";
import {LOGIN_FOLD_SIGNAL} from "@/app/navigation/types/loginFoldTypes";
import type {RouteLocationState} from "@/app/navigation/types/slideIntentTypes";

export const LoginFoldHost = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const state = location.state as RouteLocationState | null;

	const shouldPlay =
		state?.loginFold === LOGIN_FOLD_SIGNAL && state.loginFoldLayout;

	const layout = state?.loginFoldLayout;

	const onComplete = useCallback(() => {
		const nextState: RouteLocationState = {};
		if (state?.slide) {
			nextState.slide = state.slide;
		}
		if (state?.focusTransactionId) {
			nextState.focusTransactionId = state.focusTransactionId;
		}

		navigate(
			{pathname: location.pathname, search: location.search},
			{
				replace: true,
				state: Object.keys(nextState).length > 0 ? nextState : null,
			},
		);
	}, [location.pathname, location.search, navigate, state]);

	const host = useMemo(() => {
		if (!shouldPlay || !layout) {
			return null;
		}

		return <LoginFoldIntoMark layout={layout} onComplete={onComplete} />;
	}, [layout, onComplete, shouldPlay]);

	return host;
};
