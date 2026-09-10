import {
	isMobileBrowser,
	isPwaStandalone,
} from "@/shared/lib/isMobileBrowser";
import {getWebsiteTesting} from "@/shared/services/storage/appStorage";

export const ENTRY_TARGET = {
	AUTH: "auth",
	DESKTOP_ONLY: "desktop-only",
	MOBILE_INSTALL: "mobile-install",
} as const;

export type EntryTarget = (typeof ENTRY_TARGET)[keyof typeof ENTRY_TARGET];

export const resolveEntryTarget = (): EntryTarget => {
	if (getWebsiteTesting()) {
		return ENTRY_TARGET.AUTH;
	}

	if (!isMobileBrowser()) {
		return ENTRY_TARGET.DESKTOP_ONLY;
	}

	if (isPwaStandalone()) {
		return ENTRY_TARGET.AUTH;
	}

	return ENTRY_TARGET.MOBILE_INSTALL;
};
