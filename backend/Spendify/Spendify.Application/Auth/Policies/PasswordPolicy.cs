namespace Spendify.Application.Auth.Policies;

// Enforced in FluentValidation (user-facing) and mirrored in Identity options (backup).
public static class PasswordPolicy
{
    public const int MinLength = 8;
    public const int MaxLength = 128;

    public static bool RequireDigit { get; } = true;
    public static bool RequireLowercase { get; } = true;
    public static bool RequireUppercase { get; } = true;
    public static bool RequireNonAlphanumeric { get; } = false;
}
