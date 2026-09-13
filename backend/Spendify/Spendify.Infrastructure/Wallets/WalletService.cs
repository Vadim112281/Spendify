using Microsoft.EntityFrameworkCore;
using Spendify.Application.Common.Results;
using Spendify.Application.Wallets;
using Spendify.Application.Wallets.Interfaces;
using Spendify.Domain.Enums;
using Spendify.Domain.Models;
using Spendify.Infrastructure.Data;

namespace Spendify.Infrastructure.Wallets;

public class WalletService(AppDbContext _dbContext): IWalletService
{
    public async Task<WalletResult> CreateAsync(
        Guid userId,
        string? walletName,
        WalletType walletType,
        CurrencyType currencyType,
        CancellationToken cancellationToken = default)
    {
        var wallet = new Wallet
        {
            WalletId = Guid.NewGuid(),
            UserId = userId,
            WalletName = NormalizeWalletName(walletName),
            WalletType = walletType,
            CurrencyType = currencyType,
            CreatedAtUtc = DateTime.UtcNow,
        };

        _dbContext.Wallets.Add(wallet);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return MapToResult(wallet);
    }

    public async Task<List<WalletResult>> GetByUserIdAsync(
        Guid userId,
        CancellationToken cancellationToken = default) =>
        await _dbContext.Wallets
            .AsNoTracking()
            .Where(wallet => wallet.UserId == userId)
            .OrderBy(wallet => wallet.CreatedAtUtc)
            .Select(wallet => new WalletResult(
                wallet.WalletId,
                wallet.WalletName,
                wallet.WalletType,
                wallet.CurrencyType,
                wallet.CreatedAtUtc))
            .ToListAsync(cancellationToken);

    public async Task<AppResult<WalletResult>> UpdateAsync(
        Guid userId,
        Guid walletId,
        string? walletName,
        WalletType? walletType,
        CurrencyType? currencyType,
        CancellationToken cancellationToken = default)
    {
        var wallet = await GetWalletForUserAsync(userId, walletId, cancellationToken);
        if (wallet is null)
            return AppResult<WalletResult>.Failure(WalletErrors.NotFound);

        if (walletName is not null)
            wallet.WalletName = NormalizeWalletName(walletName);

        if (walletType.HasValue)
            wallet.WalletType = walletType.Value;

        if (currencyType.HasValue)
            wallet.CurrencyType = currencyType.Value;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return AppResult<WalletResult>.Success(MapToResult(wallet));
    }

    public async Task<AppResult<bool>> DeleteAsync(
        Guid userId,
        Guid walletId,
        CancellationToken cancellationToken = default)
    {
        var wallet = await GetWalletForUserAsync(userId, walletId, cancellationToken);
        if (wallet is null)
            return AppResult<bool>.Failure(WalletErrors.NotFound);

        _dbContext.Wallets.Remove(wallet);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return AppResult<bool>.Success(true);
    }

    private async Task<Wallet?> GetWalletForUserAsync(
        Guid userId,
        Guid walletId,
        CancellationToken cancellationToken) =>
        await _dbContext.Wallets
            .FirstOrDefaultAsync(
                wallet => wallet.WalletId == walletId && wallet.UserId == userId,
                cancellationToken);

    private static WalletResult MapToResult(Wallet wallet) =>
        new(
            wallet.WalletId,
            wallet.WalletName,
            wallet.WalletType,
            wallet.CurrencyType,
            wallet.CreatedAtUtc);

    private static string? NormalizeWalletName(string? walletName) =>
        string.IsNullOrWhiteSpace(walletName) ? null : walletName.Trim();
}
