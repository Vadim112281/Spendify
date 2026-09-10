import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";
import {
	TabIcon,
	type TabIconActiveProps,
} from "@/app/layout/AppTabBar/components/icons/TabIcon";

export const AnalyticsTabIcon = ({active}: TabIconActiveProps) => (
	<TabIcon active={active}>
		<AppDecorativeIcon width={22} height={22} strokeWidth={active ? 2.1 : 1.85}>
			<path d="M4 19V5M4 19h16M8 17V11M12 17V7M16 17v-4" />
		</AppDecorativeIcon>
	</TabIcon>
);
