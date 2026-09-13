using Spendify.Domain.Enums;

namespace Spendify.Application.Wallets;

public record WalletResult(
    Guid WalletId,
    string? WalletName,
    WalletType WalletType,
    CurrencyType CurrencyType,
    DateTime CreatedAtUtc);
