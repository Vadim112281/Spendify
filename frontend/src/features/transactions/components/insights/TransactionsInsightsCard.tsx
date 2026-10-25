import {CategoryDonutChart} from "@/features/transactions/components/insights/CategoryDonutChart";
import {CategoryInsightsBreakdown} from "@/features/transactions/components/insights/CategoryInsightsBreakdown";
import type {TransactionInsightsModel} from "@/features/transactions/services/transactionInsightsService";
import {formatCurrencyAmount} from "@/shared/utils/moneyFormat";
import {twx} from "@/shared/utils/twx";

type TransactionsInsightsCardProps = {
	insights: TransactionInsightsModel;
	currencySymbol: string;
};

export const TransactionsInsightsCard = ({
	insights,
	currencySymbol,
}: TransactionsInsightsCardProps) => {
	return (
		<section
			className={twx(
				"rounded-18 e-home-stat-surface p-16",
				!insights.isAllTypes && insights.isExpense && "e-stat-ring-expense",
				!insights.isAllTypes && !insights.isExpense && "e-stat-ring-income",
				insights.isAllTypes && "e-stat-ring-neutral",
			)}
			aria-label={insights.cardLabel}
		>
			<p className="m-0 mb-14 text-11 font-medium tracking-label text-e-zinc uppercase">
				{insights.cardLabel}
			</p>
			<div
				className={twx(
					"grid items-center gap-x-16 gap-y-14",
					insights.isEmpty
						? "grid-cols-1 justify-items-center"
						: "grid-cols-[118px_1fr]",
				)}
			>
				<div className="relative mx-auto aspect-square size-118 shrink-0 justify-self-center">
					<CategoryDonutChart segments={insights.segments} />
					<div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
						{insights.isEmpty ? (
							<span className="text-13 font-medium text-e-muted">
								{insights.emptyMessage}
							</span>
						) : (
							<>
								<span className="font-mono text-12 font-semibold tabular-nums tracking-tight-03 leading-115 text-e-heading">
									{formatCurrencyAmount(insights.centerTotal, currencySymbol)}
								</span>
								<span className="mt-3 text-10 uppercase leading-120 tracking-wide text-e-muted">
									{insights.centerCaption}
								</span>
							</>
						)}
					</div>
				</div>
				{insights.isEmpty ? null : (
					<CategoryInsightsBreakdown
						segments={insights.segments}
						currencySymbol={currencySymbol}
						shareContextLabel={insights.shareContextLabel}
						isAllTypes={insights.isAllTypes}
						isExpense={insights.isExpense}
					/>
				)}
			</div>
		</section>
	);
};
