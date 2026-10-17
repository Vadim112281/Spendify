import {AppField} from "@/shared/ui/AppField/AppField";
import {twx} from "@/shared/utils/twx";

type AddTransactionDetailsGroupProps = {
	note: string;
	transactionDate: string;
	onNoteChange: (note: string) => void;
	onDateChange: (date: string) => void;
	noteError?: string;
	dateError?: string;
	compact?: boolean;
};

export const AddTransactionDetailsGroup = ({
	note,
	transactionDate,
	onNoteChange,
	onDateChange,
	noteError,
	dateError,
	compact = false,
}: AddTransactionDetailsGroupProps) => (
	<div
		className={twx(
			"rounded-14 border border-white/10 bg-white/3",
			compact ? "grid grid-cols-1 gap-10 p-12" : "p-14",
		)}
	>
		<AppField
			id="add-transaction-date"
			label="Date"
			size="sm"
			type="date"
			value={transactionDate}
			error={dateError}
			className="font-mono tabular-nums"
			onChange={(event) => onDateChange(event.target.value)}
		/>

		<AppField
			id="add-transaction-note"
			label="Note"
			size="sm"
			placeholder="Optional"
			value={note}
			error={noteError}
			onChange={(event) => onNoteChange(event.target.value)}
		/>
	</div>
);
