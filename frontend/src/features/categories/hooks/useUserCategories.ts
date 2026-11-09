import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

import {
	getUserCategories,
	updateCategory as patchCategory,
	createCategory as postCategory,
} from "@/features/categories/api/categoriesApi";
import {mapLoadCategoriesError} from "@/features/categories/services/categoryMessagesService";
import type {
	CreateCategoryRequest,
	UpdateCategoryRequest,
	UserCategory,
} from "@/features/categories/types/categoryTypes";

export const userCategoriesQueryKey = ["categories"] as const;

type UpdateCategoryVariables = {
	categoryId: string;
	body: UpdateCategoryRequest;
};

export const useUserCategories = () => {
	const queryClient = useQueryClient();

	const query = useQuery({
		queryKey: userCategoriesQueryKey,
		queryFn: getUserCategories,
	});

	const error = query.isError ? mapLoadCategoriesError(query.error) : undefined;

	// Marks the categories list stale so React Query refetches GET /categories everywhere it is mounted.
	const invalidateList = () => {
		void queryClient.invalidateQueries({queryKey: userCategoriesQueryKey});
	};

	const createMutation = useMutation({
		mutationFn: (body: CreateCategoryRequest) => postCategory(body),
		onSuccess: (created) => {
			queryClient.setQueryData(
				userCategoriesQueryKey,
				(previous): UserCategory[] => {
					const list = Array.isArray(previous)
						? (previous as UserCategory[])
						: [];
					if (list.some((c) => c.categoryId === created.categoryId)) {
						return list;
					}
					return [...list, created];
				},
			);
			invalidateList();
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({categoryId, body}: UpdateCategoryVariables) =>
			patchCategory(categoryId, body),
		onSuccess: (updated) => {
			queryClient.setQueryData(
				userCategoriesQueryKey,
				(previous): UserCategory[] => {
					const list = Array.isArray(previous)
						? (previous as UserCategory[])
						: [];
					return list.map((c) =>
						c.categoryId === updated.categoryId ? updated : c,
					);
				},
			);
			invalidateList();
		},
	});

	return {
		categories: query.data ?? [],
		isLoading: query.isLoading,
		error,
		refetch: query.refetch,
		createCategory: createMutation.mutateAsync,
		updateCategory: updateMutation.mutateAsync,
	};
};
