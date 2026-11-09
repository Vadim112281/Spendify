import type {ReactNode} from "react";

import {CATEGORY_ICON_KEY} from "@/features/categories/types/categoryTypes";
import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";
import {twx} from "@/shared/utils/twx";

const CATEGORY_ICON_PATHS: Record<string, ReactNode> = {
	[CATEGORY_ICON_KEY.OTHER]: (
		<>
			<circle cx="12" cy="12" r="8" />
			<path d="M12 8v4M12 16h.01" />
		</>
	),
	[CATEGORY_ICON_KEY.GROCERIES]: (
		<>
			<path d="M6 6h15l-1.5 9H7.5L6 6z" />
			<path d="M6 6 5 3H2" />
			<circle cx="9" cy="20" r="1" />
			<circle cx="18" cy="20" r="1" />
		</>
	),
	[CATEGORY_ICON_KEY.CAFE]: (
		<>
			<path d="M17 8h1a4 4 0 0 1 0 8h-1" />
			<path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
			<path d="M6 2v2M10 2v2M14 2v2" />
		</>
	),
	[CATEGORY_ICON_KEY.TRANSPORT]: (
		<>
			<path d="M4 6h16v10H4z" />
			<path d="M4 10h16" />
			<path d="M8 16h.01M16 16h.01" />
		</>
	),
	[CATEGORY_ICON_KEY.SUBSCRIPTION]: (
		<>
			<rect x="2" y="7" width="20" height="14" rx="2" />
			<path d="M16 3v4M8 3v4" />
		</>
	),
	[CATEGORY_ICON_KEY.SALARY]: (
		<>
			<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
		</>
	),
	[CATEGORY_ICON_KEY.PHARMACY]: (
		<>
			<rect x="4" y="4" width="16" height="16" rx="2" />
			<path d="M12 8v8M8 12h8" />
		</>
	),
	[CATEGORY_ICON_KEY.HEALTH]: (
		<>
			<path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z" />
		</>
	),
	[CATEGORY_ICON_KEY.SHOPPING]: (
		<>
			<path d="M6 7h12l-1 13H7L6 7z" />
			<path d="M9 7a3 3 0 0 1 6 0" />
		</>
	),
	[CATEGORY_ICON_KEY.ENTERTAINMENT]: (
		<>
			<rect x="3" y="6" width="18" height="12" rx="2" />
			<path d="M8 6V4M16 6V4M3 12h18" />
		</>
	),
	[CATEGORY_ICON_KEY.HOME]: (
		<>
			<path d="M4 11 12 4l8 7" />
			<path d="M6 10v9h12v-9" />
		</>
	),
	[CATEGORY_ICON_KEY.UTILITIES]: (
		<>
			<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
		</>
	),
	[CATEGORY_ICON_KEY.EDUCATION]: (
		<>
			<path d="M3 9 12 5l9 4-9 4-9-4z" />
			<path d="M7 11v4c0 1.5 2.2 3 5 3s5-1.5 5-3v-4" />
		</>
	),
	[CATEGORY_ICON_KEY.TRAVEL]: (
		<>
			<path d="M3 12h18" />
			<path d="M12 3v18" />
			<circle cx="12" cy="12" r="8" />
		</>
	),
	[CATEGORY_ICON_KEY.FOOD]: (
		<>
			<path d="M5 3v8a3 3 0 0 0 6 0V3" />
			<path d="M8 3v18" />
			<path d="M16 3c2 2 2 5 0 7v11" />
		</>
	),
	[CATEGORY_ICON_KEY.GIFTS]: (
		<>
			<rect x="4" y="10" width="16" height="10" rx="1" />
			<path d="M12 10v10M4 14h16M12 10c-2-3-5-3-5-1s3 1 5 1 5-1 5-1-3-2-5 1z" />
		</>
	),
	[CATEGORY_ICON_KEY.INSURANCE]: (
		<>
			<path d="M12 3 5 6v6c0 4 3 6.5 7 8 4-1.5 7-4 7-8V6l-7-3z" />
		</>
	),
	[CATEGORY_ICON_KEY.PETS]: (
		<>
			<circle cx="7" cy="8" r="1.5" />
			<circle cx="12" cy="6" r="1.5" />
			<circle cx="17" cy="8" r="1.5" />
			<path d="M8 14c1 3 7 3 8 0 1 2-2 5-4 5s-5-3-4-5z" />
		</>
	),
	[CATEGORY_ICON_KEY.FITNESS]: (
		<>
			<path d="M6 9v6M18 9v6M3 11v2M21 11v2M6 12h12" />
		</>
	),
	[CATEGORY_ICON_KEY.BUSINESS]: (
		<>
			<rect x="4" y="8" width="16" height="12" rx="1" />
			<path d="M9 8V6a3 3 0 0 1 6 0v2M4 13h16" />
		</>
	),
};

type CategoryIconProps = {
	iconKey: string;
	size?: "sm" | "md";
	variant?: "badge" | "glyph";
};

export const CategoryIcon = ({
	iconKey,
	size = "md",
	variant = "badge",
}: CategoryIconProps) => {
	const iconPx =
		variant === "glyph"
			? size === "sm"
				? 18
				: 20
			: size === "sm"
				? 16
				: 18;

	const glyph = (
		<AppDecorativeIcon
			width={iconPx}
			height={iconPx}
			strokeWidth={1.65}
		>
			{CATEGORY_ICON_PATHS[iconKey] ??
				CATEGORY_ICON_PATHS[CATEGORY_ICON_KEY.OTHER]}
		</AppDecorativeIcon>
	);

	if (variant === "glyph") {
		return (
			<span className="text-e-heading" aria-hidden="true">
				{glyph}
			</span>
		);
	}

	return (
		<div
			className={twx(
				"grid shrink-0 place-items-center border border-white/10 bg-white/6 text-e-heading",
				size === "sm" ? "size-32 rounded-10" : "size-38 rounded-11",
			)}
			aria-hidden="true"
		>
			{glyph}
		</div>
	);
};
