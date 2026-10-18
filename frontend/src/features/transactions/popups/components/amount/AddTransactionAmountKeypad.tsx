import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";
import {twx} from "@/shared/utils/twx";

type AddTransactionAmountKeypadProps = {
	onDigit: (digit: string) => void;
	onBackspace: () => void;
};

const KEY_ROWS = [
	["1", "2", "3"],
	["4", "5", "6"],
	["7", "8", "9"],
	[".", "0", "backspace"],
] as const;

const KeypadKey = ({
	label,
	ariaLabel,
	onPress,
	className,
}: {
	label: string;
	ariaLabel: string;
	onPress: () => void;
	className?: string;
}) => (
	<button
		type="button"
		aria-label={ariaLabel}
		onClick={onPress}
		className={twx(
			"flex min-h-54 items-center justify-center rounded-14 border border-white/10 bg-white/3",
			"font-mono text-21 font-medium text-e-heading tabular-nums",
			"transition-(background,border-color,transform) duration-150",
			"active:scale-[0.97] active:bg-white/10",
			"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-zinc",
			className,
		)}
	>
		{label === "backspace" ? (
			<AppDecorativeIcon width={26} height={26} strokeWidth={1.85}>
				<path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
				<path d="m18 9-6 6" />
				<path d="m12 9 6 6" />
			</AppDecorativeIcon>
		) : (
			label
		)}
	</button>
);

export const AddTransactionAmountKeypad = ({
	onDigit,
	onBackspace,
}: AddTransactionAmountKeypadProps) => (
	<div className="grid gap-10">
		{KEY_ROWS.map((row) => (
			<div key={row.join("-")} className="grid grid-cols-3 gap-10">
				{row.map((key) => (
					<KeypadKey
						key={key}
						label={key}
						ariaLabel={
							key === "backspace" ? "Delete last digit" : `Digit ${key}`
						}
						onPress={() => {
							if (key === "backspace") {
								onBackspace();
								return;
							}

							onDigit(key);
						}}
					/>
				))}
			</div>
		))}
	</div>
);
