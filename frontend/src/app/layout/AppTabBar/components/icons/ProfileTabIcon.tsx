import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";
import {
	TabIcon,
	type TabIconActiveProps,
} from "@/app/layout/AppTabBar/components/icons/TabIcon";

export const ProfileTabIcon = ({active}: TabIconActiveProps) => (
	<TabIcon active={active}>
		<AppDecorativeIcon width={22} height={22} strokeWidth={active ? 2.1 : 1.85}>
			<circle cx="12" cy="8.5" r="3.5" />
			<path d="M5.5 19.5c0-3.2 2.9-5.5 6.5-5.5s6.5 2.3 6.5 5.5" />
		</AppDecorativeIcon>
	</TabIcon>
);
