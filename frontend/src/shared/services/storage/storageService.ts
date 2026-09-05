const STORAGE_PREFIX = "spendify:";

const buildKey = (key: string) => `${STORAGE_PREFIX}${key}`;

export const storageService = {
	getString: (key: string): string | null =>
		localStorage.getItem(buildKey(key)),

	setString: (key: string, value: string): void => {
		localStorage.setItem(buildKey(key), value);
	},

	remove: (key: string): void => {
		localStorage.removeItem(buildKey(key));
	},

	getBoolean: (key: string): boolean =>
		localStorage.getItem(buildKey(key)) === "true",

	setBoolean: (key: string, value: boolean): void => {
		localStorage.setItem(buildKey(key), String(value));
	},
};
