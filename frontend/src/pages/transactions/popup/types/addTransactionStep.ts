export const ADD_TRANSACTION_STEP = {
	AMOUNT: "amount",
	DETAILS: "details",
} as const;

export type AddTransactionStep =
	(typeof ADD_TRANSACTION_STEP)[keyof typeof ADD_TRANSACTION_STEP];

export const ADD_TRANSACTION_STEP_LABELS: Record<AddTransactionStep, string> = {
	[ADD_TRANSACTION_STEP.AMOUNT]: "Amount",
	[ADD_TRANSACTION_STEP.DETAILS]: "Details",
};
