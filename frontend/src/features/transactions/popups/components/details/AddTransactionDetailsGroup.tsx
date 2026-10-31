import {ADD_TRANSACTION_NOTE_MAX_LENGTH} from "@/features/transactions/popups/config/addTransactionFormConfig";
import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";
import {twx} from "@/shared/utils/twx";

type AddTransactionDetailsGroupProps = {
	note: string;
	transactionDate: string;
	onNoteChange: (note: string) => void;
	onDateChange: (date: string) => void;
	noteError?: string;
	dateError?: string;
	className?: string;
};

const fieldLabelClassName =
	"mb-8 block text-12 font-medium tracking-label uppercase text-e-muted";

const fieldShellClassName = (error?: string) =>
	twx(
		"flex min-h-44 items-center overflow-hidden rounded-14 border bg-e-subtle",
		error ? "border-e-error bg-e-error/8" : "border-e-border",
	);

const fieldInputClassName =
	"min-w-0 flex-1 border-0 bg-transparent px-14 py-12 text-15 text-e-zinc placeholder:text-e-muted focus:outline-none focus-visible:outline-none";

const CalendarIcon = () => (
	<AppDecorativeIcon width={18} height={18} strokeWidth={1.65}>
		<path d="M8 2v4M16 2v4M3 10h18" />
		<path d="M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
	</AppDecorativeIcon>
);

export const AddTransactionDetailsGroup = ({
	note,
	transactionDate,
	onNoteChange,
	onDateChange,
	noteError,
	dateError,
	className,
}: AddTransactionDetailsGroupProps) => (
	<div className={twx("flex flex-col gap-10", className)}>
		<div>
			<label
				htmlFor="add-transaction-date"
				className={twx(fieldLabelClassName, dateError && "text-e-error")}
			>
				Date
			</label>
			<div className={twx(fieldShellClassName(dateError), "relative isolate")}>
				<input
					id="add-transaction-date"
					type="date"
					value={transactionDate}
					aria-invalid={dateError ? true : undefined}
					aria-describedby={
						dateError ? "add-transaction-date-error" : undefined
					}
					className={twx(
						fieldInputClassName,
						"relative z-1 font-mono tabular-nums tracking-tight-03",
						"[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-44 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0",
					)}
					onChange={(event) => onDateChange(event.target.value)}
				/>
				<span
					className="pointer-events-none shrink-0 pr-14 text-e-muted"
					aria-hidden="true"
				>
					<CalendarIcon />
				</span>
			</div>
			{dateError ? (
				<p
					id="add-transaction-date-error"
					role="alert"
					className="mt-8 text-13 font-medium text-e-error"
				>
					{dateError}
				</p>
			) : null}
		</div>

		<div className="relative z-1">
			<label
				htmlFor="add-transaction-note"
				className={twx(fieldLabelClassName, noteError && "text-e-error")}
			>
				Note
			</label>
			<div className={fieldShellClassName(noteError)}>
				<input
					id="add-transaction-note"
					type="text"
					placeholder="What was this for?"
					value={note}
					maxLength={ADD_TRANSACTION_NOTE_MAX_LENGTH}
					aria-invalid={noteError ? true : undefined}
					aria-describedby={
						noteError ? "add-transaction-note-error" : undefined
					}
					className={twx(fieldInputClassName, "relative z-1 w-full text-16")}
					onChange={(event) => onNoteChange(event.target.value)}
				/>
			</div>
			{noteError ? (
				<p
					id="add-transaction-note-error"
					role="alert"
					className="mt-8 text-13 font-medium text-e-error"
				>
					{noteError}
				</p>
			) : null}
		</div>
	</div>
);
