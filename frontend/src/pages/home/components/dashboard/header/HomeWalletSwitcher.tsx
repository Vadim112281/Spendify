import {useId, useState} from "react";

import {HomeWalletSwitcherMenu} from "@/pages/home/components/dashboard/header/HomeWalletSwitcherMenu";
import {HomeWalletSwitcherTrigger} from "@/pages/home/components/dashboard/header/HomeWalletSwitcherTrigger";
import type {HomeDashboardWallet} from "@/pages/home/types/homeDashboardTypes";

type HomeWalletSwitcherProps = {
	wallets: HomeDashboardWallet[];
	activeWallet: HomeDashboardWallet;
	onSelectWallet: (walletId: string) => void;
};

export const HomeWalletSwitcher = ({
	wallets,
	activeWallet,
	onSelectWallet,
}: HomeWalletSwitcherProps) => {
	const menuId = useId();
	const [isOpen, setIsOpen] = useState(false);
	const canSwitch = wallets.length > 1;

	const onToggle = () => {
		setIsOpen((open) => !open);
	};

	const onPick = (walletId: string) => {
		onSelectWallet(walletId);
		setIsOpen(false);
	};

	return (
		<div className="relative max-w-1/2 shrink-0 min-w-0">
			{isOpen && canSwitch ? (
				<HomeWalletSwitcherMenu
					id={menuId}
					wallets={wallets}
					activeWalletId={activeWallet.walletId}
					onPick={onPick}
				/>
			) : null}

			<HomeWalletSwitcherTrigger
				wallet={activeWallet}
				canSwitch={canSwitch}
				isOpen={isOpen}
				menuId={menuId}
				onToggle={onToggle}
			/>
		</div>
	);
};
