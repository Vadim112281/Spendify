import {twx} from "@/shared/lib/twx";

type SpendifyAppIconProps = {
	size?: "sm" | "md";
};

// Same asset as tab favicon — `/favicon.svg`
export const SpendifyAppIcon = ({size = "md"}: SpendifyAppIconProps) => {
	const dim = size === "sm" ? 36 : 44;

	return (
		<span
			className={twx(
				"block shrink-0 drop-shadow-app-icon",
				size === "sm" && "size-36 drop-shadow-app-icon-sm",
				size === "md" && "size-44",
			)}
			aria-hidden="true"
		>
			<img
				className="block h-full w-full motion-safe:animate-app-icon-breathe"
				src="/favicon.svg"
				width={dim}
				height={dim}
				alt=""
			/>
		</span>
	);
};
