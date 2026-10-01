import {animate, useReducedMotion} from "motion/react";
import {useEffect, useRef, useState} from "react";

type UseAnimatedNumberOptions = {
	duration?: number;
	ease?: readonly number[];
};

export const useAnimatedNumber = (
	target: number,
	options?: UseAnimatedNumberOptions,
) => {
	const reducedMotion = useReducedMotion();
	const valueRef = useRef(0);
	const [value, setValue] = useState(0);

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

		const ease = (options?.ease ?? [0.22, 1, 0.36, 1]) as [
			number,
			number,
			number,
			number,
		];

		const controls = animate(from, target, {
			duration: options?.duration ?? 0.9,
			ease,
			onUpdate: (latest) => {
				valueRef.current = latest;
				setValue(latest);
			},
			onComplete: () => {
				valueRef.current = target;
			},
		});

		return () => controls.stop();
	}, [target, reducedMotion, options?.duration, options?.ease]);

	return value;
};
