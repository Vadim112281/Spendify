using MediatR;
using Spendify.Application.Common.Interfaces;
using Spendify.Application.Common.Results;
using Spendify.Application.Transactions.Interfaces;

namespace Spendify.Application.Transactions.Commands.DeleteTransaction;

public class DeleteTransactionHandler(
    ICurrentUserService _currentUser,
    ITransactionService _transactionService
): IRequestHandler<DeleteTransactionCommand, AppResult<bool>>
{
    public async Task<AppResult<bool>> Handle(
        DeleteTransactionCommand request,
        CancellationToken cancellationToken)
    {
        if (_currentUser.UserId is not Guid userId)
            return AppResult<bool>.Failure(TransactionErrors.Unauthorized);

        return await _transactionService.DeleteAsync(
            userId,
            request.WalletId,
            request.TransactionId,
            cancellationToken);
    }
}
