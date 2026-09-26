import type {CurrencyType} from "@/features/wallets/walletTypes";
import {CURRENCY_TYPE_OPTIONS} from "@/pages/wallets/config/createWalletFormConfig";
import {CURRENCY_ACCENT_STYLES} from "@/pages/wallets/config/currencyAccentConfig";
import {twx} from "@/shared/lib/twx";

type CreateWalletPageBackgroundProps = {
	currencyType: CurrencyType | null;
};

export const CreateWalletPageBackground = ({
	currencyType,
}: CreateWalletPageBackgroundProps) => (
	// Break out of page px-20 so the glow reaches the screen edges.
	<div
		className="pointer-events-none absolute -inset-x-20 inset-y-0"
		aria-hidden="true"
	>
		<div className="absolute inset-0 e-create-wallet-grid" />

		{CURRENCY_TYPE_OPTIONS.map((type) => {
			const isActive = currencyType === type;

			return (
				<div
					key={type}
					className={twx(
						"absolute inset-0 transition-opacity duration-700 ease-out",
						isActive ? "opacity-100" : "opacity-0",
						CURRENCY_ACCENT_STYLES[type].pageBackground,
					)}
				/>
			);
		})}

		<div
			className={twx(
				"absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-e-bg/50 to-transparent",
				"transition-opacity duration-700 ease-out",
				currencyType ? "opacity-100" : "opacity-0",
			)}
		/>
	</div>
);
