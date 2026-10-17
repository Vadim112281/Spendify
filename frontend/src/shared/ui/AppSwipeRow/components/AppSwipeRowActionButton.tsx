import {AppSwipeRowActionIcon} from "@/shared/ui/AppSwipeRow/components/AppSwipeRowActionIcon";
import {twx} from "@/shared/utils/twx";

type AppSwipeRowActionButtonProps = {
	label: string;
	tone: "neutral" | "destructive";
	onPress: () => void;
};

export const AppSwipeRowActionButton = ({
	label,
	tone,
	onPress,
}: AppSwipeRowActionButtonProps) => (
	<button
		type="button"
		aria-label={label}
		className={twx(
			"grid size-44 shrink-0 place-items-center rounded-full",
			"transition-transform duration-150 active:scale-[0.96]",
			tone === "destructive"
				? "bg-e-error/92 text-white"
				: "bg-white/10 text-e-heading",
		)}
		onClick={onPress}
	>
		<AppSwipeRowActionIcon tone={tone} />
	</button>
);
