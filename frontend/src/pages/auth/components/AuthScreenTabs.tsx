import type {Navigation} from "@/app/navigation/navigation";
import {AUTH_TAB_A11Y} from "@/pages/auth/config/authTabA11y";
import {AUTH_SCREEN, type AuthScreen} from "@/pages/auth/types/authScreen";
import {twx} from "@/shared/lib/twx";

import styles from "./AuthComponents.module.scss";

type AuthScreenTabsProps = {
	screen: AuthScreen;
	disabled?: boolean;
	navigation: Navigation;
};

const tabs: {id: AuthScreen; label: string}[] = [
	{id: AUTH_SCREEN.LOGIN, label: "Увійти"},
	{id: AUTH_SCREEN.REGISTER, label: "Реєстрація"},
];

export const AuthScreenTabs = ({
	screen,
	disabled = false,
	navigation,
}: AuthScreenTabsProps) => (
	<div
		className="relative mb-14 grid grid-cols-2 rounded-12 border border-e-border bg-e-subtle p-3"
		role="tablist"
		aria-label="Вхід або реєстрація"
	>
		<span
			className={twx(
				styles.tabsIndicator,
				"pointer-events-none absolute top-3 bottom-3 rounded-9 bg-e-surface-solid shadow-e-card",
				screen === AUTH_SCREEN.LOGIN
					? "left-3 w-[calc(50%-6px)]"
					: "left-[calc(50%+3px)] w-[calc(50%-6px)]",
			)}
			aria-hidden
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
						"relative z-1 cursor-pointer rounded-9 border-none bg-transparent py-8 text-13 font-semibold transition-colors duration-200",
						"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-heading",
						"disabled:cursor-default disabled:opacity-70",
						isActive ? "text-e-heading" : "text-e-muted hover:text-e-text",
					)}
					onClick={() => navigation.goToAuthScreen(tab.id)}
				>
					{tab.label}
				</button>
			);
		})}
	</div>
);
