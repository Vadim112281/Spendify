using Spendify.Application.Common.Results;
using Spendify.Application.Transactions.Contracts;

namespace Spendify.Application.Transactions.Interfaces;

public interface ITransactionService
{
    Task<AppResult<TransactionResult>> CreateAsync(
        Guid userId,
        Guid walletId,
        CreateTransactionRequest request,
        CancellationToken cancellationToken = default);

    Task<AppResult<PagedResult<TransactionResult>>> GetByWalletIdAsync(
        Guid userId,
        Guid walletId,
        int page,
        int pageSize,
        CancellationToken cancellationToken = default);

    Task<AppResult<TransactionResult>> UpdateAsync(
        Guid userId,
        Guid walletId,
        Guid transactionId,
        UpdateTransactionRequest request,
        CancellationToken cancellationToken = default);

    Task<AppResult<bool>> DeleteAsync(
        Guid userId,
        Guid walletId,
        Guid transactionId,
        CancellationToken cancellationToken = default);
}
