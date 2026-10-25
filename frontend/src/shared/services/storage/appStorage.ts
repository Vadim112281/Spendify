import {storageService} from "@/shared/services/storage/storageService";

const KEYS = {
	websiteTesting: "website-testing",
	authToken: "auth-token",
	activeWalletId: "active-wallet-id",
} as const;

export const getWebsiteTesting = (): boolean =>
	storageService.getBoolean(KEYS.websiteTesting);

export const setWebsiteTesting = (enabled: boolean): void => {
	storageService.setBoolean(KEYS.websiteTesting, enabled);
};

export const setAuthToken = (token: string): void => {
	storageService.setString(KEYS.authToken, token);
};

export const getAuthToken = (): string | null =>
	storageService.getString(KEYS.authToken);

export const clearAuthToken = (): void => {
	storageService.remove(KEYS.authToken);
};

export const hasAuthSession = (): boolean => getAuthToken() !== null;

export const getActiveWalletId = (): string | null =>
	storageService.getString(KEYS.activeWalletId);

export const storeActiveWalletId = (walletId: string): void => {
	storageService.setString(KEYS.activeWalletId, walletId);
};

export const clearActiveWalletId = (): void => {
	storageService.remove(KEYS.activeWalletId);
};
