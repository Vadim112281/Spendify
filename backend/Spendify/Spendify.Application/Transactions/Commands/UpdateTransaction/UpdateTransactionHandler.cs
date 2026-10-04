using MediatR;
using Spendify.Application.Common.Interfaces;
using Spendify.Application.Common.Results;
using Spendify.Application.Transactions.Contracts;
using Spendify.Application.Transactions.Interfaces;

namespace Spendify.Application.Transactions.Commands.UpdateTransaction;

public class UpdateTransactionHandler(
    ICurrentUserService _currentUser,
    ITransactionService _transactionService
): IRequestHandler<UpdateTransactionCommand, AppResult<TransactionResult>>
{
    public async Task<AppResult<TransactionResult>> Handle(
        UpdateTransactionCommand request,
        CancellationToken cancellationToken)
    {
        if (_currentUser.UserId is not Guid userId)
            return AppResult<TransactionResult>.Failure(TransactionErrors.Unauthorized);

        var updateRequest = new UpdateTransactionRequest(
            request.Type,
            request.Category,
            request.Amount,
            request.Note,
            request.TransactionDate);

        var updateResult = await _transactionService.UpdateAsync(
            userId,
            request.WalletId,
            request.TransactionId,
            updateRequest,
            cancellationToken);

        if (updateResult.IsFailure)
            return AppResult<TransactionResult>.Failure(updateResult.Error!);

        return AppResult<TransactionResult>.Success(updateResult.Value!);
    }
}
