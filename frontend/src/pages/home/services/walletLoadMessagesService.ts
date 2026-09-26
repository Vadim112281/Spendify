import {isApiError} from "@/app/api/httpClient";

const LOAD_WALLETS_ERROR_MESSAGE = "Could not load wallets. Please try again.";

const LOAD_WALLETS_MESSAGES: Record<string, string> = {
	UNAUTHORIZED: "Please sign in again.",
	UNKNOWN_ERROR: LOAD_WALLETS_ERROR_MESSAGE,
};

export const mapLoadWalletsError = (error: unknown): string => {
	if (!isApiError(error)) {
		return LOAD_WALLETS_ERROR_MESSAGE;
	}

	return LOAD_WALLETS_MESSAGES[error.code] ?? LOAD_WALLETS_ERROR_MESSAGE;
};
