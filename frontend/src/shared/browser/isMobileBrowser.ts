// Phone or tablet browser — not a desktop/laptop.
// TODO: Maybe rework it
export const isMobileBrowser = (): boolean => {
	const ua = navigator.userAgent;

	const isPhone =
		/Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			ua,
		);
	const isIPad =
		/iPad/i.test(ua) ||
		(navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
	const isAndroidTablet = /Android/i.test(ua) && !/Mobile/i.test(ua);

	return isPhone || isIPad || isAndroidTablet;
};

// App opened from home screen (installed PWA), not inside the browser tab.
export const isPwaStandalone = (): boolean =>
	window.matchMedia("(display-mode: standalone)").matches ||
	// iOS Safari
	(window.navigator as Navigator & {standalone?: boolean}).standalone === true;

export const isIosBrowser = (): boolean => {
	const ua = navigator.userAgent;
	return (
		/iPhone|iPad|iPod/i.test(ua) ||
		(navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
	);
};
