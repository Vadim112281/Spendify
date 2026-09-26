import type {WalletType} from "@/features/wallets/walletTypes";
import {WALLET_TYPE} from "@/features/wallets/walletTypes";
import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";

type WalletTypeIconProps = {
	walletType: WalletType | null;
	size?: number;
	strokeWidth?: number;
};

export const WalletTypeIcon = ({
	walletType,
	size = 16,
	strokeWidth = 1.85,
}: WalletTypeIconProps) => {
	if (walletType === WALLET_TYPE.CASH) {
		return (
			<AppDecorativeIcon width={size} height={size} strokeWidth={strokeWidth}>
				<rect x="2" y="7" width="20" height="10" rx="1.5" />
				<circle cx="12" cy="12" r="2.5" />
				<path d="M6 12h2M16 12h2" />
			</AppDecorativeIcon>
		);
	}

	if (walletType === WALLET_TYPE.CARD) {
		return (
			<AppDecorativeIcon width={size} height={size} strokeWidth={strokeWidth}>
				<rect x="3" y="6" width="18" height="12" rx="2" />
				<path d="M3 10h18" />
			</AppDecorativeIcon>
		);
	}

	return (
		<AppDecorativeIcon width={size} height={size} strokeWidth={strokeWidth}>
			<path d="M19 7H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
			<path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
		</AppDecorativeIcon>
	);
};
