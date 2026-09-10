import {motion, useReducedMotion} from "motion/react";
import type {RefObject} from "react";
import type {Navigation} from "@/app/navigation/navigation";
import {LoginForm} from "@/pages/auth/components/LoginForm";
import {RegisterForm} from "@/pages/auth/components/RegisterForm";
import {
	authPanelCenter,
	authPanelFadeHidden,
	authPanelFadeTransition,
	authPanelFadeVisible,
	authPanelHeightTransition,
	authPanelOffLeft,
	authPanelOffRight,
	authPanelPageTransition,
} from "@/pages/auth/config/authPanelVariants";
import {AUTH_TAB_A11Y} from "@/pages/auth/config/authTabA11y";
import type {AuthPanelMeasure} from "@/pages/auth/hooks/useAuthPanelHeight";
import {useAuthPanelMeasure} from "@/pages/auth/hooks/useAuthPanelMeasure";
import {AUTH_SCREEN, type AuthScreen} from "@/pages/auth/types/authScreen";
import {twx} from "@/shared/lib/twx";

import styles from "./AuthComponents.module.scss";

type AuthScreenPanelsProps = {
	screen: AuthScreen;
	height: number | null;
	viewportRef: RefObject<HTMLDivElement | null>;
	viewportReady: boolean;
	interactionsDisabled?: boolean;
	onMeasure: (measure: AuthPanelMeasure) => void;
	onMotionComplete: () => void;
	navigation: Navigation;
};

export const AuthScreenPanels = ({
	screen,
	height,
	viewportRef,
	viewportReady,
	interactionsDisabled = false,
	onMeasure,
	onMotionComplete,
	navigation,
}: AuthScreenPanelsProps) => {
	const reducedMotion = useReducedMotion();
	const panelTransition = reducedMotion
		? authPanelFadeTransition
		: authPanelPageTransition;
	const {loginRef, registerRef} = useAuthPanelMeasure({onMeasure});

	const loginAnimate = reducedMotion
		? screen === AUTH_SCREEN.LOGIN
			? authPanelFadeVisible
			: authPanelFadeHidden
		: screen === AUTH_SCREEN.LOGIN
			? authPanelCenter
			: authPanelOffLeft;

	const registerAnimate = reducedMotion
		? screen === AUTH_SCREEN.REGISTER
			? authPanelFadeVisible
			: authPanelFadeHidden
		: screen === AUTH_SCREEN.REGISTER
			? authPanelCenter
			: authPanelOffRight;

	return (
		<motion.div
			ref={viewportRef}
			initial={false}
			animate={{height: height ?? 0}}
			transition={reducedMotion ? {duration: 0} : authPanelHeightTransition}
			className={twx(
				styles.panelsViewport,
				"relative overflow-hidden",
				!reducedMotion && styles.panelsViewportPage,
				!viewportReady && "invisible",
			)}
		>
			<motion.div
				ref={loginRef}
				role="tabpanel"
				id={AUTH_TAB_A11Y[AUTH_SCREEN.LOGIN].panelId}
				aria-labelledby={AUTH_TAB_A11Y[AUTH_SCREEN.LOGIN].tabId}
				aria-hidden={screen !== AUTH_SCREEN.LOGIN}
				inert={screen !== AUTH_SCREEN.LOGIN}
				initial={false}
				animate={loginAnimate}
				transition={panelTransition}
				className="absolute top-0 right-0 left-0 w-full bg-e-surface"
				style={{
					pointerEvents:
						screen === AUTH_SCREEN.LOGIN && !interactionsDisabled
							? "auto"
							: "none",
				}}
				onAnimationComplete={() => {
					if (screen === AUTH_SCREEN.LOGIN) {
						onMotionComplete();
					}
				}}
			>
				<LoginForm
					onRegister={navigation.goToRegisterPage}
					interactionsDisabled={interactionsDisabled}
				/>
			</motion.div>
			<motion.div
				ref={registerRef}
				role="tabpanel"
				id={AUTH_TAB_A11Y[AUTH_SCREEN.REGISTER].panelId}
				aria-labelledby={AUTH_TAB_A11Y[AUTH_SCREEN.REGISTER].tabId}
				aria-hidden={screen !== AUTH_SCREEN.REGISTER}
				inert={screen !== AUTH_SCREEN.REGISTER}
				initial={false}
				animate={registerAnimate}
				transition={panelTransition}
				className="absolute top-0 right-0 left-0 w-full bg-e-surface"
				style={{
					pointerEvents:
						screen === AUTH_SCREEN.REGISTER && !interactionsDisabled
							? "auto"
							: "none",
				}}
				onAnimationComplete={() => {
					if (screen === AUTH_SCREEN.REGISTER) {
						onMotionComplete();
					}
				}}
			>
				<RegisterForm
					onLogin={navigation.goToLoginPage}
					interactionsDisabled={interactionsDisabled}
				/>
			</motion.div>
		</motion.div>
	);
};
