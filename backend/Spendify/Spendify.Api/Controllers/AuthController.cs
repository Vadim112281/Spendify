using MediatR;
using Microsoft.AspNetCore.Mvc;
using Spendify.Api.Mapping;
using Spendify.Application.Auth;
using Spendify.Application.Auth.Commands.LoginUser;
using Spendify.Application.Auth.Commands.RegisterUser;

namespace Spendify.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IMediator _mediator): ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<AuthSessionResult>> Register(
        RegisterUserCommand command,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(command, cancellationToken);
        return result.ToActionResult();
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthSessionResult>> Login(
        LoginUserCommand command,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(command, cancellationToken);
        return result.ToActionResult();
    }
}
