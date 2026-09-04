using Spendify.Application.Common.Errors;

namespace Spendify.Application.Auth.Errors;

public static class LoginErrors
{
    public static readonly AppError InvalidCredentials = new("INVALID_CREDENTIALS", statusCode: 401);
}
