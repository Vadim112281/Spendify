import type {ReactNode, SVGProps} from "react";

type AppDecorativeIconProps = SVGProps<SVGSVGElement> & {
	children: ReactNode;
};

export const AppDecorativeIcon = ({
	children,
	...props
}: AppDecorativeIconProps) => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: decorative
	<svg
		width={28}
		height={28}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={1.5}
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden
		{...props}
	>
		{children}
	</svg>
);
