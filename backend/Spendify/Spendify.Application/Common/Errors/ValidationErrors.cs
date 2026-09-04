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

    public static AppError FromFieldErrors(IReadOnlyDictionary<string, string> fieldErrors) =>
        new(Failed, StatusCode, fieldErrors);
}
