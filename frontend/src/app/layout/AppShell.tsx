import {AppPageTransition} from "@/app/layout/pageTransition/AppPageTransition";
import {AppTabBar} from "@/app/layout/AppTabBar/AppTabBar";

export const AppShell = () => {
	return (
		<div className="flex min-h-dvh flex-col bg-e-bg text-e-text color-scheme-dark">
			<main className="relative min-h-0 flex-1 overflow-hidden">
				<AppPageTransition />
			</main>
			<AppTabBar />
		</div>
	);
};
