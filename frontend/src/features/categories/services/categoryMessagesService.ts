import {isApiError} from "@/app/api/httpClient";

const LOAD_CATEGORIES_ERROR_MESSAGE =
	"Could not load categories. Please try again.";

const SAVE_CATEGORY_ERROR_MESSAGE =
	"Could not save category. Please try again.";

export const CATEGORY_NAME_DUPLICATE_CODE = "CATEGORY_NAME_DUPLICATE";

export const mapLoadCategoriesError = (error: unknown): string => {
	if (!isApiError(error)) {
		return LOAD_CATEGORIES_ERROR_MESSAGE;
	}

	if (error.code === "UNAUTHORIZED") {
		return "Please sign in again.";
	}

	return LOAD_CATEGORIES_ERROR_MESSAGE;
};

export const mapSaveCategoryError = (error: unknown): string => {
	if (!isApiError(error)) {
		return SAVE_CATEGORY_ERROR_MESSAGE;
	}

	return SAVE_CATEGORY_ERROR_MESSAGE;
};
