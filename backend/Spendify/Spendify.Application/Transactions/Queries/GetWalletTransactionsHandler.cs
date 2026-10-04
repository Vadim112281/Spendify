using MediatR;
using Spendify.Application.Common.Interfaces;
using Spendify.Application.Common.Results;
using Spendify.Application.Transactions.Interfaces;

namespace Spendify.Application.Transactions.Queries;

public class GetWalletTransactionsHandler(
    ICurrentUserService _currentUser,
    ITransactionService _transactionService
): IRequestHandler<GetWalletTransactionsQuery, AppResult<PagedResult<TransactionResult>>>
{
    public async Task<AppResult<PagedResult<TransactionResult>>> Handle(
        GetWalletTransactionsQuery request,
        CancellationToken cancellationToken)
    {
        if (_currentUser.UserId is not Guid userId)
            return AppResult<PagedResult<TransactionResult>>.Failure(TransactionErrors.Unauthorized);

        return await _transactionService.GetByWalletIdAsync(
            userId,
            request.WalletId,
            request.Page,
            request.PageSize,
            cancellationToken);
    }
}
