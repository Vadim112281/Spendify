import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";

type HomeChevronDownIconProps = {
	width?: number;
	height?: number;
	strokeWidth?: number;
	className?: string;
};

export const HomeChevronDownIcon = ({
	width = 14,
	height = 14,
	strokeWidth = 2,
	className,
}: HomeChevronDownIconProps) => (
	<AppDecorativeIcon
		className={className}
		width={width}
		height={height}
		strokeWidth={strokeWidth}
	>
		<path d="M6 9l6 6 6-6" />
	</AppDecorativeIcon>
);
