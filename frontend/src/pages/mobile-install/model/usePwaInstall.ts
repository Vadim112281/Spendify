import {useCallback, useEffect, useState} from "react";

import {isIosBrowser, isPwaStandalone} from "@/shared/lib/device/isMobileBrowser";

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>;
	userChoice: Promise<{outcome: "accepted" | "dismissed"}>;
}

export const usePwaInstall = () => {
	const [installPrompt, setInstallPrompt] =
		useState<BeforeInstallPromptEvent | null>(null);
	const [isStandalone] = useState(isPwaStandalone);
	const [isIos] = useState(isIosBrowser);

	useEffect(() => {
		const onBeforeInstall = (event: Event) => {
			event.preventDefault();
			setInstallPrompt(event as BeforeInstallPromptEvent);
		};

		window.addEventListener("beforeinstallprompt", onBeforeInstall);
		return () =>
			window.removeEventListener("beforeinstallprompt", onBeforeInstall);
	}, []);

	const install = useCallback(async () => {
		if (!installPrompt) {
			return;
		}

		await installPrompt.prompt();
		await installPrompt.userChoice;
		setInstallPrompt(null);
	}, [installPrompt]);

	return {
		canInstall: installPrompt !== null,
		install,
		isIos,
		isStandalone,
	};
};
