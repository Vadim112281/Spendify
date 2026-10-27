export const LOGIN_FOLD_SIGNAL = "login-fold" as const;

export type LoginFoldSignal = typeof LOGIN_FOLD_SIGNAL;

export const LOGIN_SUBMIT_ACK_MS = 400;

export type LoginFoldShardRect = {
	left: number;
	top: number;
	width: number;
	height: number;
	background: string;
	light?: boolean;
};

export type LoginFoldBrandIconRect = {
	left: number;
	top: number;
	width: number;
	height: number;
};

export type LoginFoldLayout = {
	shards: LoginFoldShardRect[];
	brandIcon: LoginFoldBrandIconRect;
};
