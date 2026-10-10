import {motion} from "motion/react";

import type {CurrencyType} from "@/features/wallets/walletTypes";
import {HomeAnimatedMoney} from "@/pages/home/components/dashboard/HomeAnimatedMoney";
import {HOME_MONEY_ROLL_SPRING} from "@/pages/home/config/homeDashboardMotion";
import {HomeDashTile} from "@/pages/home/components/dashboard/summary/HomeDashTile";
import type {HomeMonthSummary} from "@/pages/home/types/homeDashboardTypes";
import {twx} from "@/shared/utils/twx";

type HomeMonthFlowProps = {
	summary: HomeMonthSummary;
	currency: CurrencyType;
};

type FlowSideProps = {
	label: string;
	amount: number;
	currency: CurrencyType;
	alignEnd?: boolean;
	isIncome: boolean;
	shareLabel: string;
};

const FlowSide = ({
	label,
	amount,
	currency,
	alignEnd = false,
	isIncome,
	shareLabel,
}: FlowSideProps) => {
	const signedAmount = isIncome ? amount : -amount;

	return (
		<div className={twx("min-w-0", alignEnd && "text-right")}>
			<p className="m-0 text-11 font-medium tracking-label text-e-zinc uppercase">
				{label}
				<span className="text-e-zinc/75"> · {shareLabel}</span>
			</p>
			<p
				className={twx(
					"m-0 mt-6 text-18 font-semibold tabular-nums tracking-tight-03",
					isIncome ? "text-e-positive" : "text-e-error",
				)}
			>
				<HomeAnimatedMoney
					amount={signedAmount}
					currency={currency}
					signed
				/>
			</p>
		</div>
	);
};

export const HomeMonthFlow = ({summary, currency}: HomeMonthFlowProps) => {
	const flowTotal = summary.spent + summary.income;
	const spentShare = flowTotal > 0 ? (summary.spent / flowTotal) * 100 : 50;
	const incomeShare = 100 - spentShare;
	const spentShareLabel = `${Math.round(spentShare)}%`;
	const incomeShareLabel = `${Math.round(incomeShare)}%`;

	return (
		<HomeDashTile className="px-18 py-18" aria-label="This month cash flow">
			<p className="m-0 text-11 font-medium tracking-label text-e-zinc uppercase">
				This month
			</p>

			<div
				className="mt-12 flex h-5 overflow-hidden rounded-full bg-white/10"
				role="img"
				aria-label={`Expenses ${spentShareLabel}, income ${incomeShareLabel} of monthly flow`}
			>
				<motion.div
					className="h-full bg-e-error/85"
					initial={false}
					animate={{width: `${spentShare}%`}}
					transition={HOME_MONEY_ROLL_SPRING}
				/>
				<div className="h-full flex-1 bg-e-positive/85" />
			</div>

			<div className="mt-16 grid grid-cols-2 gap-16">
				<FlowSide
					label="Expenses"
					amount={summary.spent}
					currency={currency}
					isIncome={false}
					shareLabel={spentShareLabel}
				/>
				<FlowSide
					label="Income"
					amount={summary.income}
					currency={currency}
					alignEnd
					isIncome
					shareLabel={incomeShareLabel}
				/>
			</div>
		</HomeDashTile>
	);
};
