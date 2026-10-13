import type {Transition} from "motion/react";

export const addTransactionStepSpring: Transition = {
	type: "spring",
	stiffness: 320,
	damping: 32,
	mass: 0.9,
};
