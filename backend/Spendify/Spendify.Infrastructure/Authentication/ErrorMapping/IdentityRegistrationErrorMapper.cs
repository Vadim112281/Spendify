using Microsoft.AspNetCore.Identity;
using Spendify.Application.Auth.Errors;
using Spendify.Application.Common.Errors;

namespace Spendify.Infrastructure.Authentication.ErrorMapping;

internal static class IdentityRegistrationErrorMapper
{
    public static AppError Map(IEnumerable<IdentityError> errors)
    {
        var errorList = errors.ToList();

        if (errorList.Any(error =>
                error.Code is IdentityErrorCodes.DuplicateEmail or IdentityErrorCodes.DuplicateUserName))
            return RegistrationErrors.EmailAlreadyExists;

        if (errorList.Any(error =>
                error.Code is IdentityErrorCodes.InvalidEmail or IdentityErrorCodes.InvalidUserName))
            return ValidationErrors.FromFieldErrors(new Dictionary<string, string>
            {
                ["email"] = ValidationErrors.InvalidEmail,
            });

        return RegistrationErrors.RegistrationFailed;
    }
}
