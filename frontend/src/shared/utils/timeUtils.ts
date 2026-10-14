export const formatLongMonth = (date: Date = new Date()): string =>
	date.toLocaleDateString("en-US", {month: "long"});

export const parseCalendarTransactionDate = (transactionDate: string): Date =>
	new Date(`${transactionDate}T12:00:00`);

const isSameCalendarDay = (left: Date, right: Date): boolean =>
	left.getFullYear() === right.getFullYear() &&
	left.getMonth() === right.getMonth() &&
	left.getDate() === right.getDate();

export const formatTransactionDateGroupLabel = (
	transactionDate: string,
): string => {
	const date = parseCalendarTransactionDate(transactionDate);
	const today = new Date();

	if (isSameCalendarDay(date, today)) {
		return "Today";
	}

	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);

	if (isSameCalendarDay(date, yesterday)) {
		return "Yesterday";
	}

	const formatOptions: Intl.DateTimeFormatOptions = {
		month: "short",
		day: "numeric",
	};

	if (date.getFullYear() !== today.getFullYear()) {
		formatOptions.year = "numeric";
	}

	return date.toLocaleDateString("en-US", formatOptions);
};

