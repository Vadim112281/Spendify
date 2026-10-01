// Join Tailwind class strings; falsy values are skipped.
export const twx = (...parts: (string | false | null | undefined)[]): string =>
	parts.filter(Boolean).join(" ");
