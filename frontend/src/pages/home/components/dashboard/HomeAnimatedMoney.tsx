import {CURRENCY_TYPE_DISPLAY} from "@/features/wallets/walletDisplayService";
import type {CurrencyType} from "@/features/wallets/walletTypes";
import {HOME_MONEY_ROLL_SPRING} from "@/pages/home/config/homeDashboardMotion";
import {useAnimatedNumber} from "@/shared/hooks/useAnimatedNumber";
import {formatCurrencyAmount} from "@/shared/utils/moneyFormat";

type HomeAnimatedMoneyProps = {
	amount: number;
	currency: CurrencyType;
	signed?: boolean;
};

export const HomeAnimatedMoney = ({
	amount,
	currency,
	signed,
}: HomeAnimatedMoneyProps) => {
	const animated = useAnimatedNumber(amount, {spring: HOME_MONEY_ROLL_SPRING});

	return formatCurrencyAmount(
		Math.round(animated),
		CURRENCY_TYPE_DISPLAY[currency].symbol,
		{signed},
	);
};
