import type {WalletType} from "@/features/wallets/walletTypes";
import {WalletTypeIcon} from "@/pages/wallets/components/createWalletFormPieces/WalletTypeIcon";
import {
	WALLET_TYPE_DESCRIPTIONS,
	WALLET_TYPE_LABELS,
	WALLET_TYPE_OPTIONS,
} from "@/pages/wallets/config/createWalletFormConfig";
import {twx} from "@/shared/lib/twx";

type WalletTypeSelectorProps = {
	value: WalletType | null;
	onChange: (walletType: WalletType) => void;
};

export const WalletTypeSelector = ({
	value,
	onChange,
}: WalletTypeSelectorProps) => (
	<div
		className="grid grid-cols-2 gap-10"
		role="radiogroup"
		aria-label="Wallet type"
	>
		{WALLET_TYPE_OPTIONS.map((walletType) => {
			const isSelected = value === walletType;

			return (
				<button
					key={walletType}
					type="button"
					role="radio"
					aria-checked={isSelected}
					onClick={() => onChange(walletType)}
					className={twx(
						"flex flex-col items-start gap-8 rounded-14 border p-12 text-left",
						"transition-(border-color,background-color,box-shadow) duration-150",
						"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-zinc",
						isSelected
							? "border-white/30 bg-white/8 shadow-e-chip-selected"
							: "border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5",
					)}
				>
					<span
						className={twx(
							"grid size-32 place-items-center rounded-10 border text-e-zinc",
							isSelected
								? "border-white/20 bg-white/10"
								: "border-white/10 bg-white/6",
						)}
					>
						<WalletTypeIcon walletType={walletType} />
					</span>

					<span>
						<span className="block text-14 font-semibold text-e-zinc">
							{WALLET_TYPE_LABELS[walletType]}
						</span>
						<span className="mt-4 block text-12 leading-140 text-e-muted">
							{WALLET_TYPE_DESCRIPTIONS[walletType]}
						</span>
					</span>
				</button>
			);
		})}
	</div>
);
