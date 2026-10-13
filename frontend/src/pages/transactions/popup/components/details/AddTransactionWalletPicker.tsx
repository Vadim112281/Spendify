import {
	WALLET_TYPE_LABELS,
	walletDisplayService,
} from "@/features/wallets/walletDisplayService";
import type {Wallet} from "@/features/wallets/walletTypes";
import {twx} from "@/shared/utils/twx";

type AddTransactionWalletPickerProps = {
	wallets: Wallet[];
	value: string | null;
	onChange: (walletId: string) => void;
	error?: string;
};

export const AddTransactionWalletPicker = ({
	wallets,
	value,
	onChange,
	error,
}: AddTransactionWalletPickerProps) => {
	return (
		<div>
			<p
				className={twx(
					"mb-8 text-12 font-medium tracking-label uppercase",
					error ? "text-e-error" : "text-e-muted",
				)}
			>
				Wallet
			</p>
			<div className="flex gap-10 overflow-x-auto pb-2 scrollbar-hidden">
				{wallets.map((wallet) => {
					const isSelected = value === wallet.walletId;
					const name = walletDisplayService.getWalletDisplayName(
						wallet.walletName,
						wallet.walletType,
					);

					return (
						<button
							key={wallet.walletId}
							type="button"
							onClick={() => onChange(wallet.walletId)}
							className={twx(
								"min-h-44 shrink-0 rounded-14 border px-14 py-10 text-left",
								"transition-(border-color,background-color) duration-200",
								"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-zinc",
								isSelected
									? "border-white/28 bg-white/10 shadow-e-chip-selected"
									: "border-white/10 bg-white/4 hover:border-white/18",
							)}
						>
							<span className="block text-14 font-semibold text-e-zinc">
								{name}
							</span>
							<span className="mt-2 block text-12 text-e-muted">
								{WALLET_TYPE_LABELS[wallet.walletType]}
							</span>
						</button>
					);
				})}
			</div>
			{error ? (
				<p role="alert" className="mt-8 text-13 font-medium text-e-error">
					{error}
				</p>
			) : null}
		</div>
	);
};
