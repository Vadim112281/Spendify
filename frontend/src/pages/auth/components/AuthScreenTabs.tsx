import {motion, useReducedMotion} from "motion/react";

import {tabBarSpring} from "@/app/layout/AppTabBar/config/tabBarMotion";
import type {Navigation} from "@/app/navigation/navigation";
import {AUTH_TAB_A11Y} from "@/pages/auth/config/authTabA11y";
import {AUTH_SCREEN, type AuthScreen} from "@/pages/auth/types/authScreen";
import {twx} from "@/shared/utils/twx";

type AuthScreenTabsProps = {
	screen: AuthScreen;
	disabled?: boolean;
	navigation: Navigation;
};

const tabs: {id: AuthScreen; label: string}[] = [
	{id: AUTH_SCREEN.LOGIN, label: "Log in"},
	{id: AUTH_SCREEN.REGISTER, label: "Sign up"},
];

export const AuthScreenTabs = ({
	screen,
	disabled = false,
	navigation,
}: AuthScreenTabsProps) => {
	const reducedMotion = useReducedMotion();

	return (
		<div
			className="relative mb-14 grid grid-cols-2 rounded-12 border border-e-border bg-e-subtle p-3"
			role="tablist"
			aria-label="Log in or sign up"
		>
			<motion.span
				className={twx(
					"pointer-events-none absolute top-3 bottom-3 rounded-9",
					"border border-white/10 bg-e-surface-solid",
				)}
				aria-hidden
				initial={false}
				animate={{
					left: screen === AUTH_SCREEN.LOGIN ? 3 : "calc(50% + 3px)",
					width: "calc(50% - 6px)",
				}}
				transition={reducedMotion ? {duration: 0} : tabBarSpring}
			/>
			{tabs.map((tab) => {
				const isActive = screen === tab.id;

				return (
					<button
						key={tab.id}
						type="button"
						role="tab"
						id={AUTH_TAB_A11Y[tab.id].tabId}
						aria-controls={AUTH_TAB_A11Y[tab.id].panelId}
						aria-selected={isActive}
						tabIndex={isActive ? 0 : -1}
						disabled={disabled}
						className={twx(
							"relative z-1 min-h-44 cursor-pointer rounded-9 border-none bg-transparent py-8 text-13 font-semibold transition-colors duration-200",
							"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-zinc",
							"disabled:cursor-default disabled:opacity-70",
							isActive ? "text-e-zinc" : "text-e-muted hover:text-e-text",
						)}
						onClick={() => navigation.goToAuthScreen(tab.id)}
					>
						{tab.label}
					</button>
				);
			})}
		</div>
	);
};
