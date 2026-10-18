import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";

type AppSwipeRowActionIconProps = {
	tone: "neutral" | "destructive";
};

export const AppSwipeRowActionIcon = ({tone}: AppSwipeRowActionIconProps) => {
	if (tone === "destructive") {
		return (
			<AppDecorativeIcon width={18} height={18} strokeWidth={2}>
				<path d="M3 6h18" />
				<path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
				<path d="M10 11v6" />
				<path d="M14 11v6" />
				<path d="M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" />
			</AppDecorativeIcon>
		);
	}

	return (
		<AppDecorativeIcon width={18} height={18} strokeWidth={2}>
			<path d="M12 20h9" />
			<path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
		</AppDecorativeIcon>
	);
};
