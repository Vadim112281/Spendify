import {
	CURRENCY_TYPE_DISPLAY,
	getWalletDisplayNameForPreview,
	WALLET_TYPE_LABELS,
} from "@/features/wallets/walletDisplay";
import {WalletTypeIcon} from "@/pages/wallets/components/createWalletFormPieces/WalletTypeIcon";
import {CURRENCY_ACCENT_STYLES} from "@/pages/wallets/config/currencyAccentConfig";
import type {CreateWalletFormValues} from "@/pages/wallets/types/createWalletFormTypes";
import {twx} from "@/shared/utils/twx";

type CreateWalletPreviewCardProps = {
	values: CreateWalletFormValues;
};

const PREVIEW_NAME_BEFORE_TYPE = "New wallet";

const getPreviewMeta = (values: CreateWalletFormValues): string => {
	if (values.walletType && values.currencyType) {
		return `${WALLET_TYPE_LABELS[values.walletType]} · ${CURRENCY_TYPE_DISPLAY[values.currencyType].label}`;
	}

	return "Choose type and currency below";
};

const PreviewWalletIcon = ({
	walletType,
}: {
	walletType: CreateWalletFormValues["walletType"];
}) => <WalletTypeIcon walletType={walletType} size={18} strokeWidth={1.75} />;

const neutralPreviewWashClassName = twx(
	"bg-linear-to-br from-white/10 via-white/5 to-white/3",
);

export const CreateWalletPreviewCard = ({
	values,
}: CreateWalletPreviewCardProps) => {
	const currencyType = values.currencyType;
	const currencySymbol = currencyType
		? CURRENCY_TYPE_DISPLAY[currencyType].symbol
		: null;
	const accent = currencyType ? CURRENCY_ACCENT_STYLES[currencyType] : null;

	return (
		<div
			className={twx(
				"relative overflow-hidden rounded-18 border border-white/12",
				"shadow-e-card backdrop-blur-md transition-[background] duration-300",
				accent ? accent.previewWash : neutralPreviewWashClassName,
			)}
		>
			{accent ? (
				<>
					<div
						className={twx(
							"pointer-events-none absolute inset-y-10 left-0 w-1 rounded-full",
							accent.previewStripe,
						)}
						aria-hidden="true"
					/>
					<div
						className={twx(
							"pointer-events-none absolute inset-0",
							accent.previewGlow,
						)}
						aria-hidden="true"
					/>
				</>
			) : null}

			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/35 to-transparent"
				aria-hidden="true"
			/>

			{currencySymbol ? (
				<span
					className={twx(
						"pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 text-48 font-semibold leading-none",
						accent?.previewWatermark ?? "text-white/8",
					)}
					aria-hidden="true"
				>
					{currencySymbol}
				</span>
			) : null}

			<div className="relative flex items-center gap-14 p-16">
				<div
					className={twx(
						"grid size-44 shrink-0 place-items-center rounded-14 border bg-e-dash text-e-zinc",
						"transition-(border-color,box-shadow) duration-300",
						accent ? accent.previewIconBadge : "border-white/10 shadow-e-dash",
					)}
				>
					<PreviewWalletIcon walletType={values.walletType} />
				</div>

				<div className="min-w-0 flex-1 pr-32">
					<p className="truncate text-16 font-semibold tracking-tight-03 text-e-zinc">
						{getWalletDisplayNameForPreview(
							values.walletName,
							values.walletType,
							PREVIEW_NAME_BEFORE_TYPE,
						)}
					</p>
					<p className="mt-6 truncate text-13 text-e-muted">
						{getPreviewMeta(values)}
					</p>
				</div>
			</div>
		</div>
	);
};
