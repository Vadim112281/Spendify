using MediatR;
using Spendify.Application.Auth;
using Spendify.Application.Common.Results;

namespace Spendify.Application.Auth.Commands.RegisterUser;

public class RegisterUserCommand: IRequest<AppResult<AuthSessionResult>>
{
    public required string Email { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Password { get; set; }
}
