import {motion} from "motion/react";

import {tabBarIconSpring} from "@/app/layout/AppTabBar/config/tabBarMotion";
import {HomeWalletSwitcherSummary} from "@/pages/home/components/dashboard/header/HomeWalletSwitcherSummary";
import {HomeChevronDownIcon} from "@/pages/home/components/dashboard/icons/HomeChevronDownIcon";
import type {HomeDashboardWallet} from "@/pages/home/types/homeDashboardTypes";
import {twx} from "@/shared/utils/twx";

const shellClassName = twx(
	"flex min-h-44 w-full items-center gap-8 rounded-full py-8 pr-12 pl-10",
	"e-home-stat-surface backdrop-blur-sm",
);

type HomeWalletSwitcherTriggerProps = {
	wallet: HomeDashboardWallet;
	canSwitch: boolean;
	isOpen: boolean;
	menuId: string;
	onToggle: () => void;
};

export const HomeWalletSwitcherTrigger = ({
	wallet,
	canSwitch,
	isOpen,
	menuId,
	onToggle,
}: HomeWalletSwitcherTriggerProps) => {
	const summary = (
		<HomeWalletSwitcherSummary
			name={wallet.name}
			walletTypeLabel={wallet.walletTypeLabel}
			labelClassName="text-e-heading"
		/>
	);

	if (!canSwitch) {
		return <div className={shellClassName}>{summary}</div>;
	}

	return (
		<button
			type="button"
			className={twx(shellClassName, "cursor-pointer")}
			aria-expanded={isOpen}
			aria-haspopup="menu"
			aria-controls={menuId}
			onClick={onToggle}
		>
			{summary}
			<motion.span
				className="ml-auto shrink-0 text-e-zinc/80"
				initial={false}
				animate={{rotate: isOpen ? 180 : 0}}
				transition={tabBarIconSpring}
			>
				<HomeChevronDownIcon />
			</motion.span>
		</button>
	);
};
