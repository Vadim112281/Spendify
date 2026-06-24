using MediatR;
using Spendify.Application.Auth;
using Spendify.Application.Common.Results;

namespace Spendify.Application.Auth.Commands.LoginUser;

public class LoginUserCommand: IRequest<AppResult<AuthSessionResult>>
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}
