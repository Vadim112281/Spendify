import {useMemo} from "react";

import {CategoryIcon} from "@/features/categories/components/CategoryIcon";
import {
	CATEGORY_FORM_PRIMARY_ICON_KEYS,
	CATEGORY_FORM_SECONDARY_ICON_KEYS,
} from "@/features/categories/config/categoryFormConfig";
import {CATEGORY_ICON_KEYS} from "@/features/categories/types/categoryTypes";
import {twx} from "@/shared/utils/twx";

type CategoryFormIconGridProps = {
	iconKey: string | undefined;
	showAllIcons: boolean;
	labelledBy?: string;
	onSelectIcon: (iconKey: string) => void;
	onShowAllIcons: () => void;
};

const categoryIconAriaLabel = (iconKey: string): string =>
	iconKey.length > 0
		? iconKey.charAt(0).toUpperCase() + iconKey.slice(1)
		: "Icon";

const iconTileClassName = (selected: boolean) =>
	twx(
		"flex aspect-square w-full min-h-44 items-center justify-center rounded-10 border",
		"transition-colors duration-150",
		"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-zinc",
		selected ? "border-white/22 bg-white/12" : "border-transparent bg-white/6",
	);

export const CategoryFormIconGrid = ({
	iconKey,
	showAllIcons,
	labelledBy,
	onSelectIcon,
	onShowAllIcons,
}: CategoryFormIconGridProps) => {
	const keys = useMemo(() => {
		if (showAllIcons) {
			return CATEGORY_ICON_KEYS;
		}

		return CATEGORY_FORM_PRIMARY_ICON_KEYS;
	}, [showAllIcons]);

	const showMoreTile =
		!showAllIcons && CATEGORY_FORM_SECONDARY_ICON_KEYS.length > 0;

	return (
		<fieldset
			className="m-0 grid grid-cols-4 gap-8 border-0 p-0"
			aria-labelledby={labelledBy}
		>
			{keys.map((key) => {
				const selected = iconKey === key;
				return (
					<button
						key={key}
						type="button"
						aria-label={categoryIconAriaLabel(key)}
						aria-pressed={selected}
						className={iconTileClassName(selected)}
						onClick={() => onSelectIcon(key)}
					>
						<CategoryIcon iconKey={key} size="sm" variant="glyph" />
					</button>
				);
			})}
			{showMoreTile ? (
				<button
					type="button"
					aria-label="More icons"
					className={iconTileClassName(false)}
					onClick={onShowAllIcons}
				>
					<span
						className="text-20 font-semibold leading-none text-e-muted"
						aria-hidden="true"
					>
						⋯
					</span>
				</button>
			) : null}
		</fieldset>
	);
};
