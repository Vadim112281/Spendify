import {
	ADD_TRANSACTION_STEP,
	ADD_TRANSACTION_STEP_LABELS,
	type AddTransactionStep,
} from "@/features/transactions/popups/types/addTransactionStep";
import {twx} from "@/shared/utils/twx";

type AddTransactionStepIndicatorProps = {
	step: AddTransactionStep;
};

const STEPS = [
	ADD_TRANSACTION_STEP.AMOUNT,
	ADD_TRANSACTION_STEP.DETAILS,
] as const;

export const AddTransactionStepIndicator = ({
	step,
}: AddTransactionStepIndicatorProps) => {
	const activeIndex = STEPS.indexOf(step);

	return (
		<ol
			className="m-0 flex list-none items-center gap-6 p-0"
			aria-label="Transaction steps"
		>
			{STEPS.map((item, index) => {
				const isActive = item === step;
				const isComplete = index < activeIndex;

				return (
					<li key={item} className="flex min-w-0 flex-1 items-center gap-6">
						<span
							className={twx(
								"grid size-22 shrink-0 place-items-center rounded-full font-mono text-11 font-semibold",
								isActive
									? "border border-white/22 bg-white/10 text-e-heading shadow-e-chip-selected"
									: isComplete
										? "border border-white/16 bg-white/8 text-e-zinc"
										: "border border-white/14 bg-white/4 text-e-muted",
							)}
							aria-hidden
						>
							{index + 1}
						</span>
						<span
							className={twx(
								"truncate text-12 font-medium tracking-wide uppercase",
								isActive ? "text-e-zinc" : "text-e-muted",
							)}
						>
							{ADD_TRANSACTION_STEP_LABELS[item]}
						</span>
						{index < STEPS.length - 1 ? (
							<span
								className={twx(
									"ml-auto h-px min-w-16 flex-1",
									isComplete ? "bg-white/22" : "bg-white/10",
								)}
								aria-hidden
							/>
						) : null}
					</li>
				);
			})}
		</ol>
	);
};
