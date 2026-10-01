import {HomeWalletSwitcher} from "@/pages/home/components/dashboard/header/HomeWalletSwitcher";
import type {HomeDashboardWallet} from "@/pages/home/types/homeDashboardTypes";

type HomeDashboardHeaderProps = {
	monthLabel: string;
	wallets: HomeDashboardWallet[];
	activeWallet: HomeDashboardWallet;
	onSelectWallet: (walletId: string) => void;
};

export const HomeDashboardHeader = ({
	monthLabel,
	wallets,
	activeWallet,
	onSelectWallet,
}: HomeDashboardHeaderProps) => (
	<div className="flex items-start gap-12">
		<div className="min-w-0 flex-1">
			<p
				className="m-0 text-11 font-medium tracking-label text-e-zinc uppercase"
			>
				Overview
			</p>
			<h1 className="m-0 mt-6 text-26 font-semibold leading-120 tracking-tight-03 text-e-heading">
				{monthLabel}
			</h1>
		</div>

		<HomeWalletSwitcher
			wallets={wallets}
			activeWallet={activeWallet}
			onSelectWallet={onSelectWallet}
		/>
	</div>
);
