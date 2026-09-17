import {AppTabBar} from "@/app/layout/AppTabBar/AppTabBar";
import {AppPageTransition} from "@/app/layout/pageTransition/AppPageTransition";

export const AppShell = () => {
	return (
		<div className="relative h-dvh overflow-hidden bg-e-bg text-e-text color-scheme-dark">
			<main className="absolute inset-0 overflow-hidden">
				<AppPageTransition />
			</main>
			<AppTabBar />
		</div>
	);
};
