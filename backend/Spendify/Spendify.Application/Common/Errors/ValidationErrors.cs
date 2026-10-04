namespace Spendify.Application.Common.Errors;

public static class ValidationErrors
{
    public const string Failed = "VALIDATION_FAILED";
    public const int StatusCode = 400;

    public const string EmailRequired = "EMAIL_REQUIRED";
    public const string InvalidEmail = "INVALID_EMAIL";
    public const string EmailTooLong = "EMAIL_TOO_LONG";

    public const string PasswordRequired = "PASSWORD_REQUIRED";
    public const string PasswordTooShort = "PASSWORD_TOO_SHORT";
    public const string PasswordTooLong = "PASSWORD_TOO_LONG";
    public const string PasswordRequiresDigit = "PASSWORD_REQUIRES_DIGIT";
    public const string PasswordRequiresLowercase = "PASSWORD_REQUIRES_LOWERCASE";
    public const string PasswordRequiresUppercase = "PASSWORD_REQUIRES_UPPERCASE";
    public const string PasswordRequiresNonAlphanumeric = "PASSWORD_REQUIRES_NON_ALPHANUMERIC";

    public const string FirstNameRequired = "FIRST_NAME_REQUIRED";
    public const string FirstNameTooShort = "FIRST_NAME_TOO_SHORT";
    public const string FirstNameTooLong = "FIRST_NAME_TOO_LONG";

    public const string LastNameRequired = "LAST_NAME_REQUIRED";
    public const string LastNameTooShort = "LAST_NAME_TOO_SHORT";
    public const string LastNameTooLong = "LAST_NAME_TOO_LONG";

    public const string WalletIdRequired = "WALLET_ID_REQUIRED";

    public const string WalletNameTooLong = "WALLET_NAME_TOO_LONG";

    public const string WalletTypeRequired = "WALLET_TYPE_REQUIRED";
    public const string InvalidWalletType = "INVALID_WALLET_TYPE";

    public const string CurrencyTypeRequired = "CURRENCY_TYPE_REQUIRED";
    public const string InvalidCurrencyType = "INVALID_CURRENCY_TYPE";

    public const string WalletUpdateFieldsRequired = "WALLET_UPDATE_FIELDS_REQUIRED";

    public const string TransactionIdRequired = "TRANSACTION_ID_REQUIRED";

    public const string TransactionTypeRequired = "TRANSACTION_TYPE_REQUIRED";
    public const string InvalidTransactionType = "INVALID_TRANSACTION_TYPE";

    public const string TransactionCategoryRequired = "TRANSACTION_CATEGORY_REQUIRED";
    public const string InvalidTransactionCategory = "INVALID_TRANSACTION_CATEGORY";

    public const string TransactionAmountRequired = "TRANSACTION_AMOUNT_REQUIRED";
    public const string TransactionAmountTooSmall = "TRANSACTION_AMOUNT_TOO_SMALL";
    public const string TransactionAmountTooLarge = "TRANSACTION_AMOUNT_TOO_LARGE";

    public const string TransactionNoteTooLong = "TRANSACTION_NOTE_TOO_LONG";

    public const string TransactionDateRequired = "TRANSACTION_DATE_REQUIRED";

    public const string TransactionUpdateFieldsRequired = "TRANSACTION_UPDATE_FIELDS_REQUIRED";

    public const string PageTooSmall = "PAGE_TOO_SMALL";
    public const string PageTooLarge = "PAGE_TOO_LARGE";
    public const string PageSizeTooSmall = "PAGE_SIZE_TOO_SMALL";
    public const string PageSizeTooLarge = "PAGE_SIZE_TOO_LARGE";

    public static AppError FromFieldErrors(IReadOnlyDictionary<string, string> fieldErrors) =>
        new(Failed, StatusCode, fieldErrors);
}
