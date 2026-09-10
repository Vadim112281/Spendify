import {storageService} from "@/shared/services/storage/storageService";

const KEYS = {
	websiteTesting: "website-testing",
	authToken: "auth-token",
} as const;

export const getWebsiteTesting = (): boolean =>
	storageService.getBoolean(KEYS.websiteTesting);

export const setWebsiteTesting = (enabled: boolean): void => {
	storageService.setBoolean(KEYS.websiteTesting, enabled);
};

export const setAuthToken = (token: string): void => {
	storageService.setString(KEYS.authToken, token);
};

// TODO: export when httpClient sends Authorization from the stored token.
const getAuthToken = (): string | null =>
	storageService.getString(KEYS.authToken);

// TODO: export when logout clears the session (sign-out, 401, etc.).
const clearAuthToken = (): void => {
	storageService.remove(KEYS.authToken);
};
