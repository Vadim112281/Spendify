import {CURRENCY_TYPE, type CurrencyType} from "@/features/wallets/walletTypes";

type CurrencyAccentStyle = {
	symbolBadge: string;
	symbolText: string;
	previewWash: string;
	previewStripe: string;
	previewWatermark: string;
	previewGlow: string;
	previewIconBadge: string;
	pageBackground: string;
};

export const CURRENCY_ACCENT_STYLES: Record<CurrencyType, CurrencyAccentStyle> =
	{
		[CURRENCY_TYPE.USD]: {
			symbolBadge: "border-green-600/25 bg-green-600/14",
			symbolText: "text-green-500",
			previewWash: "bg-linear-to-br from-green-600/12 via-white/5 to-white/2",
			previewStripe: "bg-green-600/65",
			previewWatermark: "text-green-600/18",
			previewGlow:
				"bg-[radial-gradient(ellipse_at_85%_50%,rgb(22_163_74/0.14),transparent_52%)]",
			previewIconBadge:
				"border-green-600/20 shadow-[0_0_24px_-8px_rgb(22_163_74/0.35)]",
			pageBackground:
				"bg-[radial-gradient(ellipse_100%_70%_at_50%_0%,rgb(22_163_74/0.18),transparent_62%),radial-gradient(ellipse_55%_45%_at_100%_35%,rgb(22_163_74/0.09),transparent_55%),radial-gradient(ellipse_45%_35%_at_0%_65%,rgb(22_163_74/0.06),transparent_50%)]",
		},
		[CURRENCY_TYPE.EUR]: {
			symbolBadge: "border-[rgb(0_51_153/0.35)] bg-[rgb(0_51_153/0.16)]",
			symbolText: "text-[#6BA3E8]",
			previewWash:
				"bg-linear-to-br from-[rgb(0_51_153/0.14)] via-white/5 to-white/2",
			previewStripe: "bg-[#003399]/70",
			previewWatermark: "text-[#6BA3E8]/38",
			previewGlow:
				"bg-[radial-gradient(ellipse_at_85%_50%,rgb(0_51_153/0.16),transparent_52%)]",
			previewIconBadge:
				"border-[rgb(0_51_153/0.28)] shadow-[0_0_24px_-8px_rgb(0_51_153/0.4)]",
			pageBackground:
				"bg-[radial-gradient(ellipse_100%_70%_at_50%_0%,rgb(0_51_153/0.2),transparent_62%),radial-gradient(ellipse_55%_45%_at_100%_35%,rgb(0_51_153/0.1),transparent_55%),radial-gradient(ellipse_45%_35%_at_0%_65%,rgb(0_51_153/0.07),transparent_50%)]",
		},
		[CURRENCY_TYPE.UAH]: {
			symbolBadge: "border-[rgb(201_162_39/0.3)] bg-[rgb(201_162_39/0.12)]",
			symbolText: "text-[#D4B84A]",
			previewWash:
				"bg-linear-to-br from-[rgb(201_162_39/0.1)] via-white/5 to-white/2",
			previewStripe: "bg-[#C9A227]/60",
			previewWatermark: "text-[#C9A227]/16",
			previewGlow:
				"bg-[radial-gradient(ellipse_at_85%_50%,rgb(201_162_39/0.12),transparent_52%)]",
			previewIconBadge:
				"border-[rgb(201_162_39/0.22)] shadow-[0_0_24px_-8px_rgb(201_162_39/0.28)]",
			pageBackground:
				"bg-[radial-gradient(ellipse_100%_70%_at_50%_0%,rgb(201_162_39/0.14),transparent_62%),radial-gradient(ellipse_55%_45%_at_100%_35%,rgb(201_162_39/0.07),transparent_55%),radial-gradient(ellipse_45%_35%_at_0%_65%,rgb(201_162_39/0.05),transparent_50%)]",
		},
	};
