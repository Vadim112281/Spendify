import type {SVGProps} from "react";

import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";

type AppIconLinkProps = SVGProps<SVGSVGElement>;

export const AppIconLink = (props: AppIconLinkProps) => (
	<AppDecorativeIcon {...props}>
		<path d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0-7.07-7.07L10 5" />
		<path d="M14 11a5 5 0 0 0-7.07 0L5.52 12.41a5 5 0 0 0 7.07 7.07L14 19" />
	</AppDecorativeIcon>
);
