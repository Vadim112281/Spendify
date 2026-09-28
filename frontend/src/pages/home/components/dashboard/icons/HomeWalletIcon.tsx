import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";

type HomeWalletIconProps = {
	width?: number;
	height?: number;
	strokeWidth?: number;
	className?: string;
};

export const HomeWalletIcon = ({
	width = 24,
	height = 24,
	strokeWidth = 1.65,
	className,
}: HomeWalletIconProps) => (
	<AppDecorativeIcon
		className={className}
		width={width}
		height={height}
		strokeWidth={strokeWidth}
	>
		<path d="M19 7H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
		<path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
	</AppDecorativeIcon>
);
