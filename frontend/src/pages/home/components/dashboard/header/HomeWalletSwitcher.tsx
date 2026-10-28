import {AnimatePresence, motion, useReducedMotion} from "motion/react";
import {useId, useState} from "react";

import {tabBarIconSpring} from "@/app/layout/AppTabBar/config/tabBarMotion";
import {HomeWalletSwitcherMenu} from "@/pages/home/components/dashboard/header/HomeWalletSwitcherMenu";
import {HomeWalletSwitcherTrigger} from "@/pages/home/components/dashboard/header/HomeWalletSwitcherTrigger";
import type {HomeDashboardWallet} from "@/pages/home/types/homeDashboardTypes";

type HomeWalletSwitcherProps = {
	wallets: HomeDashboardWallet[];
	activeWallet: HomeDashboardWallet;
	onSelectWallet: (walletId: string) => void;
	onAddWallet: () => void;
};

export const HomeWalletSwitcher = ({
	wallets,
	activeWallet,
	onSelectWallet,
	onAddWallet,
}: HomeWalletSwitcherProps) => {
	const menuId = useId();
	const reducedMotion = useReducedMotion();
	const [isOpen, setIsOpen] = useState(false);
	const canOpenMenu = wallets.length >= 1;

	const handleToggle = () => {
		setIsOpen((open) => !open);
	};

	const handlePickWallet = (walletId: string) => {
		onSelectWallet(walletId);
		setIsOpen(false);
	};

	const handleAddWallet = () => {
		setIsOpen(false);
		onAddWallet();
	};

	return (
		<div className="relative max-w-1/2 shrink-0 min-w-0">
			<AnimatePresence initial={false}>
				{isOpen && canOpenMenu ? (
					<motion.div
						key="home-wallet-switcher-menu"
						className="absolute top-full right-0 z-20 mt-8 min-w-full origin-top-right"
						initial={reducedMotion ? false : {opacity: 0, y: -6, scale: 0.96}}
						animate={{opacity: 1, y: 0, scale: 1}}
						exit={reducedMotion ? undefined : {opacity: 0, y: -6, scale: 0.96}}
						transition={tabBarIconSpring}
					>
						<HomeWalletSwitcherMenu
							id={menuId}
							wallets={wallets}
							activeWalletId={activeWallet.walletId}
							onPick={handlePickWallet}
							onAddWallet={handleAddWallet}
						/>
					</motion.div>
				) : null}
			</AnimatePresence>

			<HomeWalletSwitcherTrigger
				wallet={activeWallet}
				canOpenMenu={canOpenMenu}
				isOpen={isOpen}
				menuId={menuId}
				onToggle={handleToggle}
			/>
		</div>
	);
};
