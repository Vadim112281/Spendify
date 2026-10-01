import type {CurrencyType} from "@/features/wallets/walletTypes";
import {
	HOME_MONEY_ROLL_DURATION_S,
	HOME_MONEY_ROLL_EASE,
} from "@/pages/home/config/homeDashboardMotion";
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
	const animated = useAnimatedNumber(amount, {
		duration: HOME_MONEY_ROLL_DURATION_S,
		ease: HOME_MONEY_ROLL_EASE,
	});

	return formatHomeMoney(Math.round(animated), currency, {signed});
};
