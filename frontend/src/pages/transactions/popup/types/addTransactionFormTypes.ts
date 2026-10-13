import type {TransactionCategory} from "@/features/transactions/types/transactionCategory";
import type {TransactionType} from "@/pages/transactions/types/transactionTypes";
import type {CreateTransactionErrorCode} from "@/pages/transactions/popup/types/addTransactionErrorCodes";

export type AddTransactionFormValues = {
	amountInput: string;
	type: TransactionType;
	category: TransactionCategory | null;
	walletId: string | null;
	note: string;
	transactionDate: string;
};

export const ADD_TRANSACTION_FORM_FIELD = {
	AMOUNT_INPUT: "amountInput",
	TYPE: "type",
	CATEGORY: "category",
	WALLET_ID: "walletId",
	NOTE: "note",
	TRANSACTION_DATE: "transactionDate",
} as const satisfies Record<string, keyof AddTransactionFormValues>;

export type AddTransactionFieldErrorKey = Exclude<
	keyof AddTransactionFormValues,
	"type"
>;

export type AddTransactionFieldErrorCodes = Partial<
	Record<AddTransactionFieldErrorKey, CreateTransactionErrorCode>
>;

export type AddTransactionFieldErrors = Partial<
	Record<AddTransactionFieldErrorKey, string>
>;

export const isAddTransactionFieldErrorKey = (
	key: keyof AddTransactionFormValues,
): key is AddTransactionFieldErrorKey => key !== ADD_TRANSACTION_FORM_FIELD.TYPE;
