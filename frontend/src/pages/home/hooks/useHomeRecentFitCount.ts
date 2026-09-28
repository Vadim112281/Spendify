import {useLayoutEffect, useState} from "react";

// Matches HomeTransactionRow (icon + py-12); used until first row is measured.
const HOME_TRANSACTION_ROW_FALLBACK_PX = 62;

export const useHomeRecentFitCount = (
	transactionCount: number,
	viewport: HTMLElement | null,
) => {
	const [fitCount, setFitCount] = useState(transactionCount);

	useLayoutEffect(() => {
		if (!viewport || transactionCount === 0) {
			setFitCount(0);
			return;
		}

		const measure = () => {
			const available = viewport.clientHeight;
			if (available <= 0) {
				setFitCount(transactionCount);
				return;
			}

			const firstRow = viewport.querySelector("ul > li");
			const rowHeight =
				firstRow?.getBoundingClientRect().height ??
				HOME_TRANSACTION_ROW_FALLBACK_PX;
			const maxRows = Math.max(1, Math.floor(available / rowHeight));
			setFitCount(Math.min(transactionCount, maxRows));
		};

		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(viewport);
		return () => observer.disconnect();
	}, [transactionCount, viewport]);

	return fitCount;
};
