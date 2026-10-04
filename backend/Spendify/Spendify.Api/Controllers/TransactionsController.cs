using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Spendify.Api.Mapping;
using Spendify.Application.Common.Results;
using Spendify.Application.Transactions;
using Spendify.Application.Transactions.Commands.CreateTransaction;
using Spendify.Application.Transactions.Commands.DeleteTransaction;
using Spendify.Application.Transactions.Commands.UpdateTransaction;
using Spendify.Application.Transactions.Policies;
using Spendify.Application.Transactions.Queries;

namespace Spendify.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/wallets/{walletId:guid}/transactions")]
public class TransactionsController(IMediator _mediator): ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<TransactionResult>>> GetByWallet(
        Guid walletId,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = TransactionPolicy.DefaultPageSize,
        CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(
            new GetWalletTransactionsQuery(walletId, page, pageSize),
            cancellationToken);

        return result.ToActionResult();
    }

    [HttpPost]
    public async Task<ActionResult<TransactionResult>> Create(
        Guid walletId,
        CreateTransactionCommand command,
        CancellationToken cancellationToken)
    {
        command.WalletId = walletId;
        var result = await _mediator.Send(command, cancellationToken);

        return result.ToCreatedResult();
    }

    [HttpPatch("{transactionId:guid}")]
    public async Task<ActionResult<TransactionResult>> Update(
        Guid walletId,
        Guid transactionId,
        UpdateTransactionCommand command,
        CancellationToken cancellationToken)
    {
        command.WalletId = walletId;
        command.TransactionId = transactionId;
        var result = await _mediator.Send(command, cancellationToken);

        return result.ToActionResult();
    }

    [HttpDelete("{transactionId:guid}")]
    public async Task<IActionResult> Delete(
        Guid walletId,
        Guid transactionId,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(
            new DeleteTransactionCommand(walletId, transactionId),
            cancellationToken);

        return result.ToNoContentResult();
    }
}
