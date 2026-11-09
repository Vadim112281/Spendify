import {useEffect, useId, useState} from "react";

import {isApiError} from "@/app/api/httpClient";
import {CategoryFormIconGrid} from "@/features/categories/components/CategoryFormIconGrid";
import {categoryFormIconGridStartsExpanded} from "@/features/categories/config/categoryFormConfig";
import {useUserCategories} from "@/features/categories/hooks/useUserCategories";
import {
	CATEGORY_NAME_DUPLICATE_CODE,
	mapSaveCategoryError,
} from "@/features/categories/services/categoryMessagesService";
import {categoryNameError} from "@/features/categories/services/categoryNameValidationService";
import {
	CATEGORY_NAME_MAX_LENGTH,
	type CategoryKind,
	type CreateCategoryRequest,
	type UpdateCategoryRequest,
	type UserCategory,
} from "@/features/categories/types/categoryTypes";
import {AppButton} from "@/shared/ui/AppButton/AppButton";
import {AppField} from "@/shared/ui/AppField/AppField";
import {AppPopup} from "@/shared/ui/AppPopup/AppPopup";
import {twx} from "@/shared/utils/twx";

type CategoryFormPopupProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	kind: CategoryKind;
	category?: UserCategory;
	onSaved?: (category: UserCategory) => void;
};

type SaveCategoryCategoryFormArgs = {
	createCategory: (body: CreateCategoryRequest) => Promise<UserCategory>;
	updateCategory: (variables: {
		categoryId: string;
		body: UpdateCategoryRequest;
	}) => Promise<UserCategory>;
	kind: CategoryKind;
	category?: UserCategory;
	body: Pick<CreateCategoryRequest, "name" | "iconKey">;
};

const saveCategoryFromForm = async ({
	createCategory,
	updateCategory,
	kind,
	category,
	body,
}: SaveCategoryCategoryFormArgs): Promise<UserCategory> => {
	if (category) {
		return updateCategory({
			categoryId: category.categoryId,
			body,
		});
	}

	return createCategory({...body, kind});
};

export const CategoryFormPopup = ({
	open,
	onOpenChange,
	kind,
	category,
	onSaved,
}: CategoryFormPopupProps) => {
	const nameFieldId = useId();
	const iconFieldLabelId = useId();
	const {categories, createCategory, updateCategory} = useUserCategories();
	const [name, setName] = useState("");
	const [iconKey, setIconKey] = useState<string | undefined>();
	const [showAllIcons, setShowAllIcons] = useState(false);
	const [nameError, setNameError] = useState<string | undefined>();
	const [saveError, setSaveError] = useState<string | undefined>();
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		if (!open) {
			return;
		}

		const initialIconKey = category?.iconKey;
		setName(category?.name ?? "");
		setIconKey(initialIconKey);
		setShowAllIcons(categoryFormIconGridStartsExpanded(initialIconKey));
		setNameError(undefined);
		setSaveError(undefined);
	}, [open, category]);

	const validationError = categoryNameError(
		name,
		categories,
		kind,
		category?.categoryId,
	);
	const canSave =
		iconKey !== undefined && validationError === undefined && !isSaving;
	const sheetTitle = category ? "Edit category" : "New category";

	const handleSave = async () => {
		if (!iconKey || validationError) {
			setNameError(validationError);
			return;
		}

		setIsSaving(true);
		setSaveError(undefined);

		try {
			const body = {name: name.trim(), iconKey};
			const saved = await saveCategoryFromForm({
				createCategory,
				updateCategory,
				kind,
				category,
				body,
			});
			onSaved?.(saved);
			onOpenChange(false);
		} catch (error) {
			if (isApiError(error) && error.code === CATEGORY_NAME_DUPLICATE_CODE) {
				setNameError("Name already used.");
			} else {
				setSaveError(mapSaveCategoryError(error));
			}
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<AppPopup
			open={open}
			onOpenChange={onOpenChange}
			title={sheetTitle}
			size="nested"
			hugContent
			showHandle={false}
		>
			<div
				className={twx(
					"flex flex-col gap-16 px-20 pb-32",
					showAllIcons && "max-h-[min(56dvh,400px)] overflow-y-auto",
				)}
			>
				<AppField
					id={nameFieldId}
					label="Name"
					size="sm"
					value={name}
					maxLength={CATEGORY_NAME_MAX_LENGTH}
					error={
						nameError ?? (name.trim().length > 0 ? validationError : undefined)
					}
					onChange={(event) => {
						setName(event.target.value);
						setNameError(undefined);
					}}
				/>

				<div>
					<p
						id={iconFieldLabelId}
						className="mb-8 text-12 font-medium tracking-label text-e-muted uppercase"
					>
						Icon
					</p>
					<CategoryFormIconGrid
						iconKey={iconKey}
						showAllIcons={showAllIcons}
						labelledBy={iconFieldLabelId}
						onSelectIcon={setIconKey}
						onShowAllIcons={() => setShowAllIcons(true)}
					/>
				</div>

				{saveError ? (
					<p role="alert" className="text-13 font-medium text-e-error">
						{saveError}
					</p>
				) : null}

				<AppButton
					className="mt-4"
					disabled={!canSave}
					onClick={() => void handleSave()}
				>
					Save
				</AppButton>
			</div>
		</AppPopup>
	);
};
