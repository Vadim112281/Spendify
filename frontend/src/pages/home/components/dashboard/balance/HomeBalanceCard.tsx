import {HomeAnimatedMoney} from "@/pages/home/components/dashboard/HomeAnimatedMoney";
import {HomeDashTile} from "@/pages/home/components/dashboard/summary/HomeDashTile";
import type {
	HomeDashboardWallet,
	HomeMonthSummary,
} from "@/pages/home/types/homeDashboardTypes";
import {twx} from "@/shared/utils/twx";

type HomeBalanceCardProps = {
	wallet: HomeDashboardWallet;
	monthSummary: HomeMonthSummary;
};

const getHomeNetSign = (net: number) => ({
	isPositive: net > 0,
	isNegative: net < 0,
	isNeutral: net === 0,
});

export const HomeBalanceCard = ({
	wallet,
	monthSummary,
}: HomeBalanceCardProps) => {
	const net = monthSummary.income - monthSummary.spent;
	const netSign = getHomeNetSign(net);

	return (
		<HomeDashTile className="px-18 py-18" aria-label="Wallet balance">
			<div className="flex items-stretch justify-between gap-16">
				<div className="min-w-0">
					<p
						className="m-0 text-11 font-medium tracking-label text-e-zinc uppercase"
					>
						Total balance
					</p>
					<p className="m-0 mt-8 text-32 font-bold leading-110 tracking-tight-03 text-e-heading tabular-nums">
						<HomeAnimatedMoney
							amount={wallet.balance}
							currency={wallet.currency}
						/>
					</p>
				</div>

				<div className="flex shrink-0 flex-col justify-between text-right">
					<p
						className="m-0 text-11 font-medium tracking-label text-e-zinc uppercase"
					>
						This month
					</p>
					<p
						className={twx(
							"m-0 text-15 font-semibold tabular-nums tracking-tight-03",
							netSign.isPositive && "text-e-positive",
							netSign.isNegative && "text-e-error",
							netSign.isNeutral && "text-e-heading",
						)}
					>
						<HomeAnimatedMoney
							amount={net}
							currency={wallet.currency}
							signed
						/>
					</p>
				</div>
			</div>
		</HomeDashTile>
	);
};
