using MediatR;
using Spendify.Application.Auth;
using Spendify.Application.Auth.Interfaces;
using Spendify.Application.Common.Interfaces;
using Spendify.Application.Common.Results;

namespace Spendify.Application.Auth.Commands.RegisterUser;

public class RegisterUserHandler(
    IAuthService _authService,
    ITokenService _tokenService
): IRequestHandler<RegisterUserCommand, AppResult<AuthSessionResult>>
{
    public async Task<AppResult<AuthSessionResult>> Handle(
        RegisterUserCommand request,
        CancellationToken cancellationToken)
    {
        var registrationResult = await _authService.RegisterAsync(
            request.FirstName,
            request.LastName,
            request.Email,
            request.Password,
            cancellationToken);

        if (registrationResult.IsFailure)
            return AppResult<AuthSessionResult>.Failure(registrationResult.Error!);

        // TODO: Extract session + token creation — same code in LoginUserHandler.
        var (userId, email) = registrationResult.Value!;

        return AppResult<AuthSessionResult>.Success(
            AuthSessionResult.Create(userId, email, _tokenService.GenerateToken(userId, email)));
    }
}
