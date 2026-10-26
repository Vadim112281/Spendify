const MONTH_TRANSACTIONS_EMPTY_MESSAGE =
	"No transactions yet. Tap + to add your first one.";

export const MonthTransactionsEmptyState = () => (
	<p className="m-0 text-14 leading-relaxed text-e-zinc/85">
		{MONTH_TRANSACTIONS_EMPTY_MESSAGE}
	</p>
);
