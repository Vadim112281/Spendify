using Spendify.Application.Common.Errors;

namespace Spendify.Application.Auth.Errors;

public static class RegistrationErrors
{
    public static readonly AppError EmailAlreadyExists = new("EMAIL_ALREADY_EXISTS", statusCode: 409);

    public static readonly AppError RegistrationFailed = new("REGISTRATION_FAILED", statusCode: 400);
}
