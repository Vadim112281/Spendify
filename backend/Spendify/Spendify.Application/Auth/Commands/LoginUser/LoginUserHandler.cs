using MediatR;
using Spendify.Application.Auth;
using Spendify.Application.Auth.Interfaces;
using Spendify.Application.Common.Interfaces;
using Spendify.Application.Common.Results;

namespace Spendify.Application.Auth.Commands.LoginUser;

public class LoginUserHandler(
    IAuthService _authService,
    ITokenService _tokenService
): IRequestHandler<LoginUserCommand, AppResult<AuthSessionResult>>
{
    public async Task<AppResult<AuthSessionResult>> Handle(
        LoginUserCommand request,
        CancellationToken cancellationToken)
    {
        var loginResult = await _authService.LoginAsync(
            request.Email,
            request.Password,
            cancellationToken);

        if (loginResult.IsFailure)
            return AppResult<AuthSessionResult>.Failure(loginResult.Error!);

        // TODO: Extract session + token creation — same code in RegisterUserHandler.
        var (userId, email) = loginResult.Value!;

        return AppResult<AuthSessionResult>.Success(
            AuthSessionResult.Create(userId, email, _tokenService.GenerateToken(userId, email)));
    }
}
