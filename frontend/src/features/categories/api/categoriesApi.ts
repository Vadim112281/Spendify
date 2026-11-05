import {httpClient} from "@/app/api/httpClient";
import type {
	CreateCategoryRequest,
	UpdateCategoryRequest,
	UserCategory,
} from "@/features/categories/types/categoryTypes";

export const getUserCategories = (): Promise<UserCategory[]> =>
	httpClient<UserCategory[]>("/categories");

export const createCategory = (
	body: CreateCategoryRequest,
): Promise<UserCategory> =>
	httpClient<UserCategory>("/categories", {
		method: "POST",
		body: JSON.stringify(body),
	});

export const updateCategory = (
	categoryId: string,
	body: UpdateCategoryRequest,
): Promise<UserCategory> =>
	httpClient<UserCategory>(`/categories/${categoryId}`, {
		method: "PATCH",
		body: JSON.stringify(body),
	});
