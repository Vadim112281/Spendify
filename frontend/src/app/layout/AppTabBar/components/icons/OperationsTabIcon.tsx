import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";
import {
	TabIcon,
	type TabIconActiveProps,
} from "@/app/layout/AppTabBar/components/icons/TabIcon";

export const OperationsTabIcon = ({active}: TabIconActiveProps) => (
	<TabIcon active={active}>
		<AppDecorativeIcon width={22} height={22} strokeWidth={active ? 2.1 : 1.85}>
			<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
		</AppDecorativeIcon>
	</TabIcon>
);
