import {useEffect} from "react";

const PAGE_SCROLL_SELECTOR = "[data-app-page-scroll]";

// Locks app page scroll containers while a body portal (modal) is open.
export const useScrollLock = (active: boolean) => {
	useEffect(() => {
		if (!active) {
			return;
		}

		const pageElements =
			document.querySelectorAll<HTMLElement>(PAGE_SCROLL_SELECTOR);
		const savedOverflow = new Map<HTMLElement, string>();

		for (const element of pageElements) {
			savedOverflow.set(element, element.style.overflow);
			element.style.overflow = "hidden";
		}

		return () => {
			for (const [element, overflow] of savedOverflow) {
				element.style.overflow = overflow;
			}
		};
	}, [active]);
};
