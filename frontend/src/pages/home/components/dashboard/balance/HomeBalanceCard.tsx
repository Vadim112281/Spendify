import {HomeAnimatedMoney} from "@/pages/home/components/dashboard/HomeAnimatedMoney";
import {HomeDashStatsError} from "@/pages/home/components/dashboard/summary/HomeDashStatsError";
import {HomeDashTile} from "@/pages/home/components/dashboard/summary/HomeDashTile";
import type {HomeDashboardWallet} from "@/pages/home/types/homeDashboardTypes";

type HomeBalanceCardProps = {
	wallet: HomeDashboardWallet;
	isStatsLoading?: boolean;
	isStatsError?: boolean;
	onStatsRetry?: () => void;
};

export const HomeBalanceCard = ({
	wallet,
	isStatsLoading = false,
	isStatsError = false,
	onStatsRetry,
}: HomeBalanceCardProps) => (
	<HomeDashTile className="px-18 py-18" aria-label="Wallet balance">
		<p className="m-0 text-11 font-medium tracking-label text-e-zinc uppercase">
			Total balance
		</p>
		{isStatsLoading ? (
			<div
				className="mt-8 h-36 w-40 max-w-full animate-pulse rounded-12 bg-white/10"
				aria-hidden="true"
			/>
		) : isStatsError ? (
			<HomeDashStatsError onRetry={onStatsRetry} />
		) : (
			<p className="m-0 mt-8 text-32 font-bold leading-110 tracking-tight-03 text-e-heading tabular-nums">
				<HomeAnimatedMoney amount={wallet.balance} currency={wallet.currency} />
			</p>
		)}
	</HomeDashTile>
);
