using Spendify.Application.Common.Results;
using Spendify.Domain.Enums;

namespace Spendify.Application.Wallets.Interfaces;

public interface IWalletService
{
    Task<WalletResult> CreateAsync(
        Guid userId,
        string? walletName,
        WalletType walletType,
        CurrencyType currencyType,
        CancellationToken cancellationToken = default);

    Task<List<WalletResult>> GetByUserIdAsync(
        Guid userId,
        CancellationToken cancellationToken = default);

    Task<AppResult<WalletResult>> UpdateAsync(
        Guid userId,
        Guid walletId,
        string? walletName,
        WalletType? walletType,
        CurrencyType? currencyType,
        CancellationToken cancellationToken = default);

    Task<AppResult<bool>> DeleteAsync(
        Guid userId,
        Guid walletId,
        CancellationToken cancellationToken = default);
}
