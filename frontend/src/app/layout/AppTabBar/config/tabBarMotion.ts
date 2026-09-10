import type {Transition} from "motion/react";

export const tabBarSpring: Transition = {
	type: "spring",
	stiffness: 520,
	damping: 34,
	mass: 0.85,
};

export const tabBarIconSpring: Transition = {
	type: "spring",
	stiffness: 480,
	damping: 28,
};

export const addButtonSpring: Transition = {
	type: "spring",
	stiffness: 420,
	damping: 26,
};
