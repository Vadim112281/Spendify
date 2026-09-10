import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";
import {
	TabIcon,
	type TabIconActiveProps,
} from "@/app/layout/AppTabBar/components/icons/TabIcon";

export const HomeTabIcon = ({active}: TabIconActiveProps) => (
	<TabIcon active={active}>
		<AppDecorativeIcon
			width={22}
			height={22}
			fill={active ? "currentColor" : "none"}
			strokeWidth={active ? 0 : 1.85}
		>
			<path d="M5 11 12 5l7 6v8a1 1 0 0 1-1 1h-4.5v-5H10.5v5H6a1 1 0 0 1-1-1v-8Z" />
		</AppDecorativeIcon>
	</TabIcon>
);
