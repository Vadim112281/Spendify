using Spendify.Domain.Enums;

namespace Spendify.Domain.Models;

public class Wallet
{
    public Guid WalletId { get; set; }
    public Guid UserId { get; set; }
    // User can set wallets' name, maybe have the default name
    public string? WalletName { get; set; }
    public WalletType WalletType { get; set; }
    public CurrencyType CurrencyType { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}