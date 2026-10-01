import {AppTabBar} from "@/app/layout/AppTabBar/AppTabBar";
import {AppPageTransition} from "@/app/layout/pageTransition/AppPageTransition";

export const AppShell = () => {
	return (
		<div
			data-app-shell
			className="flex h-dvh flex-col overflow-hidden bg-e-bg text-e-text color-scheme-dark"
		>
			<main className="relative min-h-0 flex-1 overflow-hidden">
				<AppPageTransition />
			</main>
			<AppTabBar />
		</div>
	);
};
