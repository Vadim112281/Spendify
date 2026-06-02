import {twx} from "@/shared/lib/twx";

import styles from "./AppIcon.module.scss";

type AppIconSize = "sm" | "md";

type AppIconProps = {
	size?: AppIconSize;
};

// Same asset as tab favicon — `/favicon.svg`
export const AppIcon = ({size = "md"}: AppIconProps) => {
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
				className={twx(styles.icon, "block h-full w-full origin-center")}
				src="/favicon.svg"
				width={dim}
				height={dim}
				alt=""
			/>
		</span>
	);
};
