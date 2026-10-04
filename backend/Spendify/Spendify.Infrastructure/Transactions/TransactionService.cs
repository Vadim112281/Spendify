using Microsoft.EntityFrameworkCore;
using Spendify.Application.Common.Results;
using Spendify.Application.Transactions;
using Spendify.Application.Transactions.Contracts;
using Spendify.Application.Transactions.Interfaces;
using Spendify.Domain.Models;
using Spendify.Infrastructure.Data;

namespace Spendify.Infrastructure.Transactions;

public class TransactionService(AppDbContext _dbContext): ITransactionService
{
    public async Task<AppResult<TransactionResult>> CreateAsync(
        Guid userId,
        Guid walletId,
        CreateTransactionRequest request,
        CancellationToken cancellationToken = default)
    {
        if (!await WalletExistsForUserAsync(userId, walletId, cancellationToken))
            return AppResult<TransactionResult>.Failure(TransactionErrors.WalletNotFound);

        var transaction = new Transaction
        {
            TransactionId = Guid.NewGuid(),
            WalletId = walletId,
            Type = request.Type,
            Category = request.Category,
            Amount = request.Amount,
            Note = NormalizeNote(request.Note),
            TransactionDate = request.TransactionDate,
            CreatedAtUtc = DateTime.UtcNow,
        };

        _dbContext.Transactions.Add(transaction);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return AppResult<TransactionResult>.Success(MapToResult(transaction));
    }

    public async Task<AppResult<PagedResult<TransactionResult>>> GetByWalletIdAsync(
        Guid userId,
        Guid walletId,
        int page,
        int pageSize,
        CancellationToken cancellationToken = default)
    {
        if (!await WalletExistsForUserAsync(userId, walletId, cancellationToken))
            return AppResult<PagedResult<TransactionResult>>.Failure(TransactionErrors.WalletNotFound);

        var query = _dbContext.Transactions
            .AsNoTracking()
            .Where(transaction => transaction.WalletId == walletId)
            .OrderByDescending(transaction => transaction.TransactionDate)
            .ThenByDescending(transaction => transaction.CreatedAtUtc);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(transaction => new TransactionResult(
                transaction.TransactionId,
                transaction.WalletId,
                transaction.Type,
                transaction.Category,
                transaction.Amount,
                transaction.Note,
                transaction.TransactionDate,
                transaction.CreatedAtUtc))
            .ToListAsync(cancellationToken);

        return AppResult<PagedResult<TransactionResult>>.Success(
            new PagedResult<TransactionResult>(items, totalCount, page, pageSize));
    }

    public async Task<AppResult<TransactionResult>> UpdateAsync(
        Guid userId,
        Guid walletId,
        Guid transactionId,
        UpdateTransactionRequest request,
        CancellationToken cancellationToken = default)
    {
        var transactionResult = await GetTrackedTransactionAsync(
            userId,
            walletId,
            transactionId,
            cancellationToken);
        if (transactionResult.IsFailure)
            return AppResult<TransactionResult>.Failure(transactionResult.Error!);

        var transaction = transactionResult.Value!;

        if (request.Type.HasValue)
            transaction.Type = request.Type.Value;

        if (request.Category.HasValue)
            transaction.Category = request.Category.Value;

        if (request.Amount.HasValue)
            transaction.Amount = request.Amount.Value;

        if (request.Note is not null)
            transaction.Note = NormalizeNote(request.Note);

        if (request.TransactionDate.HasValue)
            transaction.TransactionDate = request.TransactionDate.Value;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return AppResult<TransactionResult>.Success(MapToResult(transaction));
    }

    public async Task<AppResult<bool>> DeleteAsync(
        Guid userId,
        Guid walletId,
        Guid transactionId,
        CancellationToken cancellationToken = default)
    {
        var transactionResult = await GetTrackedTransactionAsync(
            userId,
            walletId,
            transactionId,
            cancellationToken);
        if (transactionResult.IsFailure)
            return AppResult<bool>.Failure(transactionResult.Error!);

        _dbContext.Transactions.Remove(transactionResult.Value!);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return AppResult<bool>.Success(true);
    }

    private async Task<bool> WalletExistsForUserAsync(
        Guid userId,
        Guid walletId,
        CancellationToken cancellationToken) =>
        await _dbContext.Wallets
            .AsNoTracking()
            .AnyAsync(
                wallet => wallet.WalletId == walletId && wallet.UserId == userId,
                cancellationToken);

    private async Task<AppResult<Transaction>> GetTrackedTransactionAsync(
        Guid userId,
        Guid walletId,
        Guid transactionId,
        CancellationToken cancellationToken)
    {
        var transaction = await _dbContext.Transactions
            .Where(item =>
                item.TransactionId == transactionId
                && item.WalletId == walletId
                && item.Wallet!.UserId == userId)
            .FirstOrDefaultAsync(cancellationToken);

        if (transaction is not null)
            return AppResult<Transaction>.Success(transaction);

        if (!await WalletExistsForUserAsync(userId, walletId, cancellationToken))
            return AppResult<Transaction>.Failure(TransactionErrors.WalletNotFound);

        return AppResult<Transaction>.Failure(TransactionErrors.NotFound);
    }

    private static TransactionResult MapToResult(Transaction transaction) =>
        new(
            transaction.TransactionId,
            transaction.WalletId,
            transaction.Type,
            transaction.Category,
            transaction.Amount,
            transaction.Note,
            transaction.TransactionDate,
            transaction.CreatedAtUtc);

    private static string? NormalizeNote(string? note) =>
        string.IsNullOrWhiteSpace(note) ? null : note.Trim();
}
