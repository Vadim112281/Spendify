export const ENTRY_LAYOUT_SIZE = {
	SM: "sm",
	MD: "md",
} as const;

export type EntryLayoutSize =
	(typeof ENTRY_LAYOUT_SIZE)[keyof typeof ENTRY_LAYOUT_SIZE];
