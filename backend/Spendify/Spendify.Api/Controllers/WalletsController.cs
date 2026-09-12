using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Spendify.Api.Mapping;
using Spendify.Application.Wallets;
using Spendify.Application.Wallets.Commands.CreateWallet;
using Spendify.Application.Wallets.Commands.DeleteWallet;
using Spendify.Application.Wallets.Commands.UpdateWallet;
using Spendify.Application.Wallets.Queries;

namespace Spendify.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/wallets")]
public class WalletsController(IMediator _mediator): ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<WalletResult>>> GetByUser(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetUserWalletsQuery(), cancellationToken);
        
        return result.ToActionResult();
    }

    [HttpPost]
    public async Task<ActionResult<WalletResult>> Create(
        CreateWalletCommand command,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(command, cancellationToken);
        
        return result.ToCreatedResult();
    }

    [HttpPatch("{walletId:guid}")]
    public async Task<ActionResult<WalletResult>> Update(
        Guid walletId,
        UpdateWalletCommand command,
        CancellationToken cancellationToken)
    {
        command.WalletId = walletId;
        var result = await _mediator.Send(command, cancellationToken);
        
        return result.ToActionResult();
    }

    [HttpDelete("{walletId:guid}")]
    public async Task<IActionResult> Delete(Guid walletId, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(
            new DeleteWalletCommand(walletId),
            cancellationToken);
        
        return result.ToNoContentResult();
    }
}
