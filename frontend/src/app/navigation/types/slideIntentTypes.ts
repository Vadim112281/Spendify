import type {AppRoute} from "@/app/navigation/routes";
import type {
	LoginFoldLayout,
	LoginFoldSignal,
} from "@/app/navigation/types/loginFoldTypes";

export const SLIDE_INTENT = {
	FORWARD: "forward",
	BACK: "back",
} as const;

export type SlideIntent = (typeof SLIDE_INTENT)[keyof typeof SLIDE_INTENT];

export type RouteLocationState = {
	slide?: SlideIntent;
	focusTransactionId?: string;
	loginFold?: LoginFoldSignal;
	loginFoldLayout?: LoginFoldLayout;
	// Tab to restore after CreateWalletPage Back or successful submit (see readWalletCreateReturnPath).
	walletCreateReturnPath?: AppRoute;
};

export type RouteNavigateOptions = {
	slide?: SlideIntent;
	replace?: boolean;
	focusTransactionId?: string;
	loginFold?: LoginFoldSignal;
	loginFoldLayout?: LoginFoldLayout;
	walletCreateReturnPath?: AppRoute;
};
