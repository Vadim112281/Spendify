import type {ReactNode} from "react";
import {AnimatePresence, motion} from "motion/react";

import {addTransactionStepSpring} from "@/pages/transactions/popup/config/addTransactionStepMotion";
import {
	ADD_TRANSACTION_STEP,
	type AddTransactionStep,
} from "@/pages/transactions/popup/types/addTransactionStep";
import {twx} from "@/shared/utils/twx";

type AddTransactionStepPanelsProps = {
	step: AddTransactionStep;
	amountPanel: ReactNode;
	detailsPanel: ReactNode;
};

const panelMotion = {
	initial: {opacity: 0, x: 28},
	animate: {opacity: 1, x: 0},
	exit: {opacity: 0, x: -28},
};

export const AddTransactionStepPanels = ({
	step,
	amountPanel,
	detailsPanel,
}: AddTransactionStepPanelsProps) => (
	<div className="relative min-h-0 flex-1 overflow-hidden">
		<AnimatePresence mode="popLayout" initial={false}>
			{step === ADD_TRANSACTION_STEP.AMOUNT ? (
				<motion.div
					key={ADD_TRANSACTION_STEP.AMOUNT}
					className={twx(
						"absolute inset-0 flex min-h-0 flex-col",
						"touch-pan-y",
					)}
					{...panelMotion}
					transition={addTransactionStepSpring}
				>
					{amountPanel}
				</motion.div>
			) : (
				<motion.div
					key={ADD_TRANSACTION_STEP.DETAILS}
					className={twx(
						"absolute inset-0 flex min-h-0 flex-col",
						"touch-pan-y",
					)}
					{...panelMotion}
					transition={addTransactionStepSpring}
				>
					{detailsPanel}
				</motion.div>
			)}
		</AnimatePresence>
	</div>
);
