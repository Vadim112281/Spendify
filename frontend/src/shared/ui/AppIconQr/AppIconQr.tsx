import type {SVGProps} from "react";

import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";

type AppIconQrProps = SVGProps<SVGSVGElement>;

export const AppIconQr = (props: AppIconQrProps) => (
	<AppDecorativeIcon {...props}>
		<rect x="3" y="3" width="7" height="7" rx="1" />
		<rect x="14" y="3" width="7" height="7" rx="1" />
		<rect x="3" y="14" width="7" height="7" rx="1" />
		<path d="M14 14h2v2h-2zM18 14h3v3h-3zM14 18h2v3h-2zM18 21h3" />
	</AppDecorativeIcon>
);
