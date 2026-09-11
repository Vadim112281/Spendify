import {
	type ApiErrorBody,
	parseErrorBody,
} from "@/app/api/parseApiErrorBody";
import {APP_ROUTES} from "@/app/navigation/routes";
import {
	clearAuthToken,
	getAuthToken,
} from "@/shared/services/storage/appStorage";

export type {ApiErrorBody};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

const getAuthHeaders = (): Record<string, string> => {
	const token = getAuthToken();
	if (!token) {
		return {};
	}

	return {Authorization: `Bearer ${token}`};
};

const handleUnauthorized = (): void => {
	clearAuthToken();

	if (window.location.pathname.startsWith(APP_ROUTES.APP)) {
		window.location.assign(APP_ROUTES.ENTRY);
	}
};

export class ApiError extends Error {
	readonly code: string;
	readonly statusCode: number;
	readonly fieldErrors: Record<string, string>;

	constructor(body: ApiErrorBody) {
		super(body.code);
		this.name = "ApiError";
		this.code = body.code;
		this.statusCode = body.statusCode;
		this.fieldErrors = body.errors ?? {};
	}
}

export const isApiError = (error: unknown): error is ApiError =>
	error instanceof ApiError;

export const httpClient = async <T>(
	path: string,
	options?: RequestInit,
): Promise<T> => {
	const response = await fetch(`${API_BASE_URL}${path}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...getAuthHeaders(),
			...options?.headers,
		},
	});

	if (response.status === 401) {
		handleUnauthorized();
		throw new ApiError(await parseErrorBody(response));
	}

	if (!response.ok) {
		throw new ApiError(await parseErrorBody(response));
	}

	if (response.status === 204) {
		return undefined as T;
	}

	return (await response.json()) as T;
};
