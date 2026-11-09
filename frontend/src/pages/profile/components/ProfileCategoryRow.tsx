import {CategoryIcon} from "@/features/categories/components/CategoryIcon";
import type {UserCategory} from "@/features/categories/types/categoryTypes";
import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";
import {twx} from "@/shared/utils/twx";

type ProfileCategoryRowProps = {
	category: UserCategory;
	className?: string;
	onEdit?: () => void;
};

const profileCategoryRowBodyClassName =
	"flex min-h-44 w-full items-center gap-10 px-14 py-12 text-left";

const profileCategoryRowNameClassName =
	"min-w-0 flex-1 truncate text-14 font-semibold tracking-tight-03 text-e-zinc";

export const ProfileCategoryRow = ({
	category,
	className,
	onEdit,
}: ProfileCategoryRowProps) => {
	if (category.isSystemSeed) {
		return (
			<div className={twx(profileCategoryRowBodyClassName, className)}>
				<CategoryIcon iconKey={category.iconKey} size="sm" />
				<span className={profileCategoryRowNameClassName}>{category.name}</span>
			</div>
		);
	}

	return (
		<button
			type="button"
			className={twx(
				profileCategoryRowBodyClassName,
				"cursor-pointer transition-colors duration-150 hover:bg-white/6",
				"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-zinc",
				className,
			)}
			onClick={onEdit}
		>
			<CategoryIcon iconKey={category.iconKey} size="sm" />
			<span className={profileCategoryRowNameClassName}>{category.name}</span>
			<span
				className="ml-auto grid size-28 shrink-0 place-items-center text-e-muted"
				aria-hidden="true"
			>
				<AppDecorativeIcon width={18} height={18} strokeWidth={2}>
					<path d="M9 6l6 6-6 6" />
				</AppDecorativeIcon>
			</span>
		</button>
	);
};
