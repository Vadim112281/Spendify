import {useMemo, useState} from "react";

import {CategoryFormPopup} from "@/features/categories/components/CategoryFormPopup";
import {useUserCategories} from "@/features/categories/hooks/useUserCategories";
import {
	CATEGORY_KIND,
	type UserCategory,
} from "@/features/categories/types/categoryTypes";
import {ProfileCategorySection} from "@/pages/profile/components/ProfileCategorySection";
import {AppButton} from "@/shared/ui/AppButton/AppButton";

export const ProfileCategoriesBlock = () => {
	const {categories, isLoading, error, refetch} = useUserCategories();
	const [editingCategory, setEditingCategory] = useState<UserCategory | null>(
		null,
	);

	const expenseCategories = useMemo(
		() => categories.filter((c) => c.kind === CATEGORY_KIND.EXPENSE),
		[categories],
	);

	const incomeCategories = useMemo(
		() => categories.filter((c) => c.kind === CATEGORY_KIND.INCOME),
		[categories],
	);

	const handleEditCategory = (category: UserCategory) => {
		if (category.isSystemSeed) {
			return;
		}
		setEditingCategory(category);
	};

	const editOpen = editingCategory !== null;

	return (
		<>
			{isLoading ? (
				<p className="m-0 text-14 text-e-muted">Loading categories…</p>
			) : error ? (
				<div>
					<p role="alert" className="m-0 text-13 font-medium text-e-error">
						{error}
					</p>
					<AppButton
						type="button"
						className="mt-16"
						onClick={() => {
							void refetch();
						}}
					>
						Try again
					</AppButton>
				</div>
			) : (
				<div className="flex flex-col gap-24">
					<ProfileCategorySection
						title="Expense categories"
						categories={expenseCategories}
						onEditCategory={handleEditCategory}
					/>
					<ProfileCategorySection
						title="Income categories"
						categories={incomeCategories}
						onEditCategory={handleEditCategory}
					/>
				</div>
			)}

			{editingCategory ? (
				<CategoryFormPopup
					open={editOpen}
					onOpenChange={(open) => {
						if (!open) {
							setEditingCategory(null);
						}
					}}
					kind={editingCategory.kind}
					category={editingCategory}
				/>
			) : null}
		</>
	);
};
