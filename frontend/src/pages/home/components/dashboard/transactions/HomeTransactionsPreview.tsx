import {useMemo} from "react";
import {MonthTransactionsEmptyState} from "@/features/transactions/components/MonthTransactionsEmptyState";
import {groupTransactionsByDate} from "@/features/transactions/services/transactionListViewService";
import type {TransactionListViewItem} from "@/features/transactions/types/transactionListViewTypes";
import {WalletLoading} from "@/features/wallets/components/WalletLoading";
import type {CurrencyType} from "@/features/wallets/walletTypes";
import {HomeRecentTransactionsDateGroup} from "@/pages/home/components/dashboard/transactions/HomeRecentTransactionsDateGroup";
import {AppButton} from "@/shared/ui/AppButton/AppButton";

const TRANSACTIONS_LOAD_ERROR_MESSAGE =
	"Could not load transactions. Please try again.";

type HomeTransactionsPreviewProps = {
	transactions: TransactionListViewItem[];
	currency: CurrencyType;
	isLoading?: boolean;
	isError?: boolean;
	onRetry?: () => void;
	onRecentRowPress?: (transactionId: string) => void;
};

export const HomeTransactionsPreview = ({
	transactions,
	currency,
	isLoading = false,
	isError = false,
	onRetry,
	onRecentRowPress,
}: HomeTransactionsPreviewProps) => {
	const groups = useMemo(
		() => groupTransactionsByDate(transactions),
		[transactions],
	);
	const hideGroupLabels = groups.length === 1;

	if (isLoading) {
		return (
			<section aria-labelledby="home-transactions-preview-heading">
				<WalletLoading label="Loading transactions..." />
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
				<MonthTransactionsEmptyState />
			) : (
				groups.map((group, index) => (
					<HomeRecentTransactionsDateGroup
						key={group.dateKey}
						group={group}
						currency={currency}
						isFirst={index === 0}
						showGroupLabel={!hideGroupLabels}
						onRowPress={(transactionId) => {
							onRecentRowPress?.(transactionId);
						}}
					/>
				))
			)}
		</section>
	);
};
