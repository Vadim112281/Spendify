namespace Spendify.Application.Auth.Policies;

public static class EmailPolicy
{
    public const int MaxLength = 256;

    public static string Normalize(string email) => email.Trim().ToLowerInvariant();
}
