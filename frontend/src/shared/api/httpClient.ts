import {
	parseErrorBody,
	type ApiErrorBody,
} from "@/shared/api/parseApiErrorBody";

export type {ApiErrorBody};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

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
};

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
			...options?.headers,
		},
	});

	if (!response.ok) {
		throw new ApiError(await parseErrorBody(response));
	}

	if (response.status === 204) {
		return undefined as T;
	}

	return (await response.json()) as T;
};
