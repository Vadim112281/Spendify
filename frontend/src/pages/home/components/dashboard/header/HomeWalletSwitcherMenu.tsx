import {HomeWalletSwitcherSummary} from "@/pages/home/components/dashboard/header/HomeWalletSwitcherSummary";
import type {HomeDashboardWallet} from "@/pages/home/types/homeDashboardTypes";
import {twx} from "@/shared/utils/twx";

type HomeWalletSwitcherMenuProps = {
	id: string;
	wallets: HomeDashboardWallet[];
	activeWalletId: string;
	onPick: (walletId: string) => void;
};

export const HomeWalletSwitcherMenu = ({
	id,
	wallets,
	activeWalletId,
	onPick,
}: HomeWalletSwitcherMenuProps) => (
	<div
		id={id}
		className={twx(
			"absolute top-full right-0 z-20 mt-8 min-w-full",
			"rounded-14 border border-white/10 bg-e-surface-solid p-6 shadow-e-card",
		)}
		role="menu"
		aria-label="Wallets"
	>
		<ul className="m-0 list-none p-0">
			{wallets.map((wallet) => {
				const isActive = wallet.walletId === activeWalletId;

				return (
					<li key={wallet.walletId}>
						<button
							type="button"
							role="menuitem"
							className={twx(
								"flex w-full cursor-pointer items-center gap-8 rounded-10 border-none px-10 py-10 text-left",
								isActive
									? "bg-white/10 text-e-heading"
									: "bg-transparent text-e-text hover:bg-white/6",
							)}
							onClick={() => onPick(wallet.walletId)}
						>
							<HomeWalletSwitcherSummary
								name={wallet.name}
								walletTypeLabel={wallet.walletTypeLabel}
							/>
						</button>
					</li>
				);
			})}
		</ul>
	</div>
);
