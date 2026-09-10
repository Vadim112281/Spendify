export type ApiErrorBody = {
	code: string;
	statusCode: number;
	errors?: Record<string, string>;
};

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
	typeof value === "object" && value !== null && !Array.isArray(value);

const isApiErrorBody = (value: unknown): value is ApiErrorBody =>
	isPlainObject(value) &&
	typeof value.code === "string" &&
	typeof value.statusCode === "number";

const unknownErrorBody = (status: number): ApiErrorBody => ({
	code: "UNKNOWN_ERROR",
	statusCode: status,
});

export const parseErrorBody = async (
	response: Response,
): Promise<ApiErrorBody> => {
	try {
		const parsed: unknown = await response.json();
		if (isApiErrorBody(parsed)) {
			return parsed;
		}
		return unknownErrorBody(response.status);
	} catch {
		return unknownErrorBody(response.status);
	}
};
