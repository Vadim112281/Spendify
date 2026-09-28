export const formatLongMonth = (date: Date = new Date()): string =>
	date.toLocaleDateString("en-US", {month: "long"});
