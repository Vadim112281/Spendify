import {
	clearAuthToken,
	setAuthToken,
} from "@/shared/services/storage/appStorage";

export const beginAuthSession = (token: string): void => {
	setAuthToken(token);
};

export const endAuthSession = (): void => {
	clearAuthToken();
};
