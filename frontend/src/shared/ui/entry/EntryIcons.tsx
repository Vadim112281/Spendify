import type {ReactNode, SVGProps} from "react";

type IconProps = SVGProps<SVGSVGElement>;

function DecorativeIcon({
	children,
	...props
}: IconProps & {children: ReactNode}) {
	return (
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
}

export function IconWallet(props: IconProps) {
	return (
		<DecorativeIcon {...props}>
			<path d="M3 7h15a3 3 0 0 1 3 3v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
			<path d="M17 12h4" />
		</DecorativeIcon>
	);
}

export function IconPhone(props: IconProps) {
	return (
		<DecorativeIcon {...props}>
			<rect x="7" y="2" width="10" height="20" rx="2.5" />
			<path d="M11 18h2" />
		</DecorativeIcon>
	);
}

export function IconCheck(props: IconProps) {
	return (
		<DecorativeIcon {...props}>
			<path d="M20 6 9 17l-5-5" />
		</DecorativeIcon>
	);
}

export function IconQr(props: IconProps) {
	return (
		<DecorativeIcon {...props}>
			<rect x="3" y="3" width="7" height="7" rx="1" />
			<rect x="14" y="3" width="7" height="7" rx="1" />
			<rect x="3" y="14" width="7" height="7" rx="1" />
			<path d="M14 14h2v2h-2zM18 14h3v3h-3zM14 18h2v3h-2zM18 21h3" />
		</DecorativeIcon>
	);
}

export function IconLink(props: IconProps) {
	return (
		<DecorativeIcon {...props}>
			<path d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0-7.07-7.07L10 5" />
			<path d="M14 11a5 5 0 0 0-7.07 0L5.52 12.41a5 5 0 0 0 7.07 7.07L14 19" />
		</DecorativeIcon>
	);
}
