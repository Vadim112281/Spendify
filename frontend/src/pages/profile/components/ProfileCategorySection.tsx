import type {UserCategory} from "@/features/categories/types/categoryTypes";

import {ProfileCategoryRow} from "@/pages/profile/components/ProfileCategoryRow";
import {twx} from "@/shared/utils/twx";

type ProfileCategorySectionProps = {
	title: string;
	categories: UserCategory[];
	onEditCategory: (category: UserCategory) => void;
};

export const ProfileCategorySection = ({
	title,
	categories,
	onEditCategory,
}: ProfileCategorySectionProps) => (
	<section>
		<h2 className="m-0 mb-12 text-12 font-medium tracking-label text-e-muted uppercase">
			{title}
		</h2>
		<div className="overflow-hidden rounded-14 border border-e-border bg-e-subtle">
			{categories.map((category, index) => (
				<ProfileCategoryRow
					key={category.categoryId}
					category={category}
					className={twx(
						index < categories.length - 1 && "border-b border-white/6",
					)}
					onEdit={() => onEditCategory(category)}
				/>
			))}
		</div>
	</section>
);
