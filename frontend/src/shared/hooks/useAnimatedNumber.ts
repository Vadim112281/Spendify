import {animate, useReducedMotion} from "motion/react";
import {useEffect, useRef, useState} from "react";

type UseAnimatedNumberOptions = {
	spring?: {
		type?: "spring";
		stiffness?: number;
		damping?: number;
		mass?: number;
	};
};

const defaultSpring = {
	type: "spring" as const,
	stiffness: 88,
	damping: 18,
	mass: 0.85,
};

export const useAnimatedNumber = (
	target: number,
	options?: UseAnimatedNumberOptions,
) => {
	const reducedMotion = useReducedMotion();
	const valueRef = useRef(0);
	const [value, setValue] = useState(0);
	const spring = options?.spring ?? defaultSpring;

	useEffect(() => {
		if (reducedMotion) {
			valueRef.current = target;
			setValue(target);
			return;
		}

		const from = valueRef.current;
		if (from === target) {
			return;
		}

		const controls = animate(from, target, {
			...spring,
			onUpdate: (latest) => {
				valueRef.current = latest;
				setValue(latest);
			},
			onComplete: () => {
				valueRef.current = target;
			},
		});

		return () => controls.stop();
	}, [target, reducedMotion, spring.damping, spring.mass, spring.stiffness]);

	return value;
};
