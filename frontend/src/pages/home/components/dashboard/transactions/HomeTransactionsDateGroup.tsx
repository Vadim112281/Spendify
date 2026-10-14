import type {CurrencyType} from "@/features/wallets/walletTypes";
import {HomeTransactionRow} from "@/pages/home/components/dashboard/transactions/HomeTransactionRow";
import type {HomeTransactionDateGroup} from "@/pages/home/services/homeDashboardTransactionsService";
import {twx} from "@/shared/utils/twx";

type HomeTransactionsDateGroupProps = {
	group: HomeTransactionDateGroup;
	currency: CurrencyType;
	isFirst?: boolean;
	showGroupLabel?: boolean;
};

export const HomeTransactionsDateGroup = ({
	group,
	currency,
	isFirst = false,
	showGroupLabel = true,
}: HomeTransactionsDateGroupProps) => {
	return (
		<div>
			{showGroupLabel ? (
				<p
					className={twx(
						"m-0 mb-8 text-11 font-medium tracking-label text-e-zinc uppercase",
						isFirst ? "mt-0" : "mt-16",
					)}
				>
					{group.label}
				</p>
			) : null}
			<ul className="m-0 flex list-none flex-col gap-8 p-0">
				{group.transactions.map((transaction) => (
					<HomeTransactionRow
						key={transaction.id}
						transaction={transaction}
						currency={currency}
					/>
				))}
			</ul>
		</div>
	);
};
