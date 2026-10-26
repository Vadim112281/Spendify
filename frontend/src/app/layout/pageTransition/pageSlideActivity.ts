type PageSlideIdleListener = () => void;

let isPageSlideActive = false;
const idleListeners = new Set<PageSlideIdleListener>();

export const getPageSlideActive = (): boolean => isPageSlideActive;

export const setPageSlideActive = (active: boolean): void => {
	if (isPageSlideActive === active) {
		return;
	}

	isPageSlideActive = active;

	if (!active) {
		for (const listener of idleListeners) {
			listener();
		}
	}
};

export const subscribePageSlideIdle = (
	listener: PageSlideIdleListener,
): (() => void) => {
	idleListeners.add(listener);
	return () => {
		idleListeners.delete(listener);
	};
};
