import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";

type ChevronDownIconProps = {
	width?: number;
	height?: number;
	strokeWidth?: number;
	className?: string;
};

export const ChevronDownIcon = ({
	width = 14,
	height = 14,
	strokeWidth = 2,
	className,
}: ChevronDownIconProps) => (
	<AppDecorativeIcon
		className={className}
		width={width}
		height={height}
		strokeWidth={strokeWidth}
	>
		<path d="M6 9l6 6 6-6" />
	</AppDecorativeIcon>
);
