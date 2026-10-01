import {useState} from "react";

import type {CurrencyType} from "@/features/wallets/walletTypes";
import {HomeTransactionRow} from "@/pages/home/components/dashboard/transactions/HomeTransactionRow";
import {useHomeRecentFitCount} from "@/pages/home/hooks/useHomeRecentFitCount";
import type {HomeDashboardTransaction} from "@/pages/home/types/homeDashboardTypes";
import {AppTextButton} from "@/shared/ui/AppTextButton/AppTextButton";
import {twx} from "@/shared/utils/twx";

type HomeTransactionsPreviewProps = {
	transactions: HomeDashboardTransaction[];
	currency: CurrencyType;
	onSeeAll?: () => void;
};

export const HomeTransactionsPreview = ({
	transactions,
	currency,
	onSeeAll,
}: HomeTransactionsPreviewProps) => {
	const [viewportEl, setViewportEl] = useState<HTMLDivElement | null>(null);
	const fitCount = useHomeRecentFitCount(transactions.length, viewportEl);
	const visibleTransactions = transactions.slice(0, fitCount);
	const hasHiddenTransactions = transactions.length > fitCount;

	return (
		<section
			className="flex min-h-0 flex-1 flex-col"
			aria-labelledby="home-transactions-preview-heading"
		>
			<div className="mb-4 flex shrink-0 items-center justify-between gap-12">
				<h2
					id="home-transactions-preview-heading"
					className="m-0 text-17 font-semibold tracking-tight-03 text-e-heading"
				>
					Recent
				</h2>
				{hasHiddenTransactions && onSeeAll ? (
					<AppTextButton
						className="shrink-0 text-12 text-e-zinc/90"
						emphasis
						onClick={onSeeAll}
					>
						See all
					</AppTextButton>
				) : null}
			</div>

			<div
				ref={setViewportEl}
				className={twx("-mx-20 min-h-0 flex-1 overflow-hidden px-20")}
			>
				<ul className="m-0 list-none divide-y divide-white/8 p-0">
					{visibleTransactions.map((transaction) => (
						<HomeTransactionRow
							key={transaction.id}
							transaction={transaction}
							currency={currency}
						/>
					))}
				</ul>
			</div>
		</section>
	);
};
