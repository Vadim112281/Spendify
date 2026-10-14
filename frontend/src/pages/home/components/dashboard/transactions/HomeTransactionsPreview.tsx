import {useMemo} from "react";

import type {CurrencyType} from "@/features/wallets/walletTypes";
import {HomeTransactionsDateGroup} from "@/pages/home/components/dashboard/transactions/HomeTransactionsDateGroup";
import {HomeWalletLoading} from "@/pages/home/components/wallet/HomeWalletLoading";
import {groupHomeTransactionsByDate} from "@/pages/home/services/homeDashboardTransactionsService";
import type {HomeDashboardTransaction} from "@/pages/home/types/homeDashboardTypes";
import {AppButton} from "@/shared/ui/AppButton/AppButton";

const TRANSACTIONS_LOAD_ERROR_MESSAGE =
	"Could not load transactions. Please try again.";

type HomeTransactionsPreviewProps = {
	transactions: HomeDashboardTransaction[];
	currency: CurrencyType;
	isLoading?: boolean;
	isError?: boolean;
	onRetry?: () => void;
};

export const HomeTransactionsPreview = ({
	transactions,
	currency,
	isLoading = false,
	isError = false,
	onRetry,
}: HomeTransactionsPreviewProps) => {
	const groups = useMemo(
		() => groupHomeTransactionsByDate(transactions),
		[transactions],
	);
	const hideGroupLabels = groups.length === 1;

	if (isLoading) {
		return (
			<section aria-labelledby="home-transactions-preview-heading">
				<HomeWalletLoading label="Loading transactions…" />
			</section>
		);
	}

	if (isError) {
		return (
			<section aria-labelledby="home-transactions-preview-heading">
				<p className="m-0 text-14 leading-relaxed text-e-zinc/85">
					{TRANSACTIONS_LOAD_ERROR_MESSAGE}
				</p>
				{onRetry ? (
					<AppButton
						type="button"
						className="mt-16"
						onClick={() => {
							void onRetry();
						}}
					>
						Try again
					</AppButton>
				) : null}
			</section>
		);
	}

	return (
		<section aria-labelledby="home-transactions-preview-heading">
			{groups.length === 0 ? (
				<p className="m-0 text-14 leading-relaxed text-e-zinc/85">
					No transactions yet. Tap + to add your first one.
				</p>
			) : (
				groups.map((group, index) => (
					<HomeTransactionsDateGroup
						key={group.dateKey}
						group={group}
						currency={currency}
						isFirst={index === 0}
						showGroupLabel={!hideGroupLabels}
					/>
				))
			)}
		</section>
	);
};
