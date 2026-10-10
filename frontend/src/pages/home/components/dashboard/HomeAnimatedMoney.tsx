import type {CurrencyType} from "@/features/wallets/walletTypes";
import {HOME_MONEY_ROLL_SPRING} from "@/pages/home/config/homeDashboardMotion";
import {formatHomeMoney} from "@/pages/home/services/homeMoneyService";
import {useAnimatedNumber} from "@/shared/hooks/useAnimatedNumber";

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

	return formatHomeMoney(Math.round(animated), currency, {signed});
};
