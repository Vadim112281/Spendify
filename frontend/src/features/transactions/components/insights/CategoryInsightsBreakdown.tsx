import {
	formatInsightsShareLabel,
	type TransactionInsightsSegment,
} from "@/features/transactions/services/transactionInsightsService";
import {formatCurrencyAmount} from "@/shared/utils/moneyFormat";
import {twx} from "@/shared/utils/twx";

type CategoryInsightsBreakdownProps = {
	segments: TransactionInsightsSegment[];
	currencySymbol: string;
	shareContextLabel: string;
	isAllTypes: boolean;
	isExpense: boolean;
};

export const CategoryInsightsBreakdown = ({
	segments,
	currencySymbol,
	shareContextLabel,
	isAllTypes,
	isExpense,
}: CategoryInsightsBreakdownProps) => (
	<div className="flex min-w-0 flex-col gap-10 text-left">
		{segments.map((segment) => {
			const shareLabel = formatInsightsShareLabel(
				segment.sharePercent,
				segment.amount,
			);
			const showThinShareBar =
				segment.amount > 0 &&
				segment.sharePercent > 0 &&
				segment.sharePercent < 1;

			return (
				<div key={segment.id} className="flex items-start gap-8">
					<span
						className="mt-5 size-8 shrink-0 rounded-full shadow-e-swatch"
						style={{backgroundColor: segment.color}}
					/>
					<div className="min-w-0 flex-1">
						<div className="mb-5 flex items-baseline justify-between gap-8">
							<span className="min-w-0 truncate text-13 font-medium text-e-heading">
								{segment.label}
							</span>
							<span
								className={twx(
									"shrink-0 font-mono text-12 font-semibold tabular-nums tracking-tight-03",
									!isAllTypes && isExpense && "text-e-error",
									!isAllTypes && !isExpense && "text-e-positive",
									isAllTypes &&
										(segment.id === "income"
											? "text-e-positive"
											: "text-e-error"),
								)}
							>
								{formatCurrencyAmount(segment.amount, currencySymbol)}
							</span>
						</div>
						<div className="h-4 overflow-hidden rounded-full bg-white/8">
							<span
								className={twx(
									"block h-full rounded-full opacity-92",
									showThinShareBar && "min-w-2",
								)}
								style={{
									width: `${segment.sharePercent}%`,
									backgroundColor: segment.color,
								}}
							/>
						</div>
						<p className="m-0 mt-3 text-10 tabular-nums tracking-wide text-e-muted">
							{shareLabel}% {shareContextLabel}
						</p>
					</div>
				</div>
			);
		})}
	</div>
);
