import {AnimatePresence, motion} from "motion/react";
import type {ReactNode} from "react";

import {twx} from "@/shared/utils/twx";

export const addTransactionDropdownChevronTransition = {
	type: "spring" as const,
	stiffness: 520,
	damping: 42,
	mass: 0.88,
};

const listPanelTransition = {
	opacity: {duration: 0.14, ease: [0.4, 0, 1, 1] as const},
	height: {
		type: "spring" as const,
		stiffness: 520,
		damping: 44,
		mass: 0.9,
	},
};

type AddTransactionDropdownListPanelProps = {
	isOpen: boolean;
	reducedMotion: boolean | null;
	listClassName?: string;
	onExitComplete?: () => void;
	children: ReactNode;
};

export const AddTransactionDropdownListPanel = ({
	isOpen,
	reducedMotion,
	listClassName,
	onExitComplete,
	children,
}: AddTransactionDropdownListPanelProps) => (
	<AnimatePresence initial={false} onExitComplete={onExitComplete}>
		{isOpen ? (
			<motion.div
				key="dropdown-list"
				className="overflow-hidden"
				initial={reducedMotion ? false : {opacity: 0, height: 0}}
				animate={{opacity: 1, height: "auto"}}
				exit={reducedMotion ? undefined : {opacity: 0, height: 0}}
				transition={reducedMotion ? {duration: 0} : listPanelTransition}
			>
				<div className={listClassName}>{children}</div>
			</motion.div>
		) : null}
	</AnimatePresence>
);

export const addTransactionDropdownShellClassName = ({
	error,
	shellOpen,
}: {
	error?: string;
	shellOpen: boolean;
}) =>
	twx(
		"overflow-hidden rounded-14 border bg-e-subtle",
		error
			? "border-e-error bg-e-error/8"
			: shellOpen
				? "border-white/22"
				: "border-e-border",
	);
