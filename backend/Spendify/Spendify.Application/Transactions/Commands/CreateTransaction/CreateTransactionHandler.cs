using MediatR;
using Spendify.Application.Common.Interfaces;
using Spendify.Application.Common.Results;
using Spendify.Application.Transactions.Contracts;
using Spendify.Application.Transactions.Interfaces;

namespace Spendify.Application.Transactions.Commands.CreateTransaction;

public class CreateTransactionHandler(
    ICurrentUserService _currentUser,
    ITransactionService _transactionService
): IRequestHandler<CreateTransactionCommand, AppResult<TransactionResult>>
{
    public async Task<AppResult<TransactionResult>> Handle(
        CreateTransactionCommand request,
        CancellationToken cancellationToken)
    {
        if (_currentUser.UserId is not Guid userId)
            return AppResult<TransactionResult>.Failure(TransactionErrors.Unauthorized);

        var createRequest = new CreateTransactionRequest(
            request.Type!.Value,
            request.Category!.Value,
            request.Amount!.Value,
            request.Note,
            request.TransactionDate!.Value);

        var createResult = await _transactionService.CreateAsync(
            userId,
            request.WalletId,
            createRequest,
            cancellationToken);

        if (createResult.IsFailure)
            return AppResult<TransactionResult>.Failure(createResult.Error!);

        return AppResult<TransactionResult>.Success(createResult.Value!);
    }
}
