namespace Spendify.Application.Auth;

public class AuthSessionResult
{
    public Guid UserId { get; init; }
    public required string Email { get; init; }
    public required string Token { get; init; }

    public static AuthSessionResult Create(Guid userId, string email, string token) =>
        new()
        {
            UserId = userId,
            Email = email,
            Token = token,
        };
}
