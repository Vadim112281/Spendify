import {HomeWalletSwitcherAddRow} from "@/pages/home/components/dashboard/header/HomeWalletSwitcherAddRow";
import {HomeWalletSwitcherSummary} from "@/pages/home/components/dashboard/header/HomeWalletSwitcherSummary";
import type {HomeDashboardWallet} from "@/pages/home/types/homeDashboardTypes";
import {twx} from "@/shared/utils/twx";

type HomeWalletSwitcherMenuProps = {
	id: string;
	wallets: HomeDashboardWallet[];
	activeWalletId: string;
	onPick: (walletId: string) => void;
	onAddWallet: () => void;
};

export const HomeWalletSwitcherMenu = ({
	id,
	wallets,
	activeWalletId,
	onPick,
	onAddWallet,
}: HomeWalletSwitcherMenuProps) => (
	<div
		id={id}
		className={twx(
			"min-w-full rounded-14 bg-e-surface p-6 e-home-stat-surface backdrop-blur-sm",
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
			<li className="mt-6 border-t border-white/10 pt-6">
				<HomeWalletSwitcherAddRow onAddWallet={onAddWallet} />
			</li>
		</ul>
	</div>
);
