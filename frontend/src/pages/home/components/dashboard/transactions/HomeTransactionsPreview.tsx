import {useMemo} from "react";
import {EditTransactionPopup} from "@/features/transactions/popups/EditTransactionPopup";
import type {CurrencyType, Wallet} from "@/features/wallets/walletTypes";
import {HomeTransactionsDateGroup} from "@/pages/home/components/dashboard/transactions/HomeTransactionsDateGroup";
import {useHomeTransactionsPreviewActions} from "@/pages/home/components/dashboard/transactions/hooks/useHomeTransactionsPreviewActions";
import {HomeWalletLoading} from "@/pages/home/components/wallet/HomeWalletLoading";
import {groupHomeTransactionsByDate} from "@/pages/home/services/homeDashboardTransactionsService";
import type {HomeDashboardTransaction} from "@/pages/home/types/homeDashboardTypes";
import {AppButton} from "@/shared/ui/AppButton/AppButton";
import {AppFormError} from "@/shared/ui/AppFormError/AppFormError";

const TRANSACTIONS_LOAD_ERROR_MESSAGE =
	"Could not load transactions. Please try again.";

type HomeTransactionsPreviewProps = {
	wallet: Wallet;
	transactions: HomeDashboardTransaction[];
	currency: CurrencyType;
	isLoading?: boolean;
	isError?: boolean;
	onRetry?: () => void;
};

export const HomeTransactionsPreview = ({
	wallet,
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
	const {
		openSwipeId,
		handleSwipeOpenChange,
		handleEditTransaction,
		handleDeleteTransaction,
		deleteError,
		editOpen,
		editTarget,
		handleEditOpenChange,
	} = useHomeTransactionsPreviewActions(wallet.walletId);

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
		<>
			<section aria-labelledby="home-transactions-preview-heading">
				{deleteError ? (
					<div className="mb-12">
						<AppFormError message={deleteError} />
					</div>
				) : null}
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
							openSwipeId={openSwipeId}
							onSwipeOpenChange={handleSwipeOpenChange}
							onEditTransaction={handleEditTransaction}
							onDeleteTransaction={handleDeleteTransaction}
						/>
					))
				)}
			</section>

			<EditTransactionPopup
				open={editOpen}
				target={editTarget}
				lockedWallet={wallet}
				onOpenChange={handleEditOpenChange}
			/>
		</>
	);
};
