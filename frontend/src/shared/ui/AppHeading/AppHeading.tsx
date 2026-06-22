import type {ReactNode} from "react";

import {twx} from "@/shared/lib/twx";

import styles from "./AppHeading.module.scss";

type AppHeadingProps = {
	children: ReactNode;
	className?: string;
};

export const AppHeading = ({children, className}: AppHeadingProps) => (
	<h1
		className={twx(
			styles.title,
			"leading-120 font-semibold tracking-tight-03 text-e-heading",
			className,
		)}
	>
		{children}
	</h1>
);
