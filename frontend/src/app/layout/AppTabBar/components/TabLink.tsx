import type {ComponentType} from "react";
import {NavLink} from "react-router-dom";

import type {TabIconActiveProps} from "@/app/layout/AppTabBar/components/icons/TabIcon";
import {type AppTabRoute, getTabSlideIntent} from "@/app/navigation/appTabs";
import {twx} from "@/shared/utils/twx";

type TabLinkProps = {
	route: AppTabRoute;
	label: string;
	end?: boolean;
	icon: ComponentType<TabIconActiveProps>;
	currentPath: string;
};

const iconTone = (active: boolean) =>
	active ? "text-e-zinc" : "text-e-zinc/42";

export const TabLink = ({
	route,
	label,
	end,
	icon: Icon,
	currentPath,
}: TabLinkProps) => (
	<NavLink
		to={route}
		end={end}
		state={{slide: getTabSlideIntent(currentPath, route)}}
		aria-label={label}
		title={label}
		className={({isActive}) =>
			twx(
				"relative z-1 flex h-full w-full items-center justify-center",
				"transition-colors duration-200",
				iconTone(isActive),
			)
		}
	>
		{({isActive}) => <Icon active={isActive} />}
	</NavLink>
);
