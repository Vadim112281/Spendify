using Spendify.Domain.Enums;

namespace Spendify.Domain.Models;

public class Transaction
{
    public Guid TransactionId { get; set; }
    public TransactionType Type { get; set; }
    public TransactionCategory Category { get; set; }
    public decimal Amount { get; set; }
    public string? Note { get; set; }
    public DateOnly TransactionDate { get; set; }
    public DateTime CreatedAtUtc { get; set; }

    public Guid WalletId { get; set; }
    public Wallet? Wallet { get; set; }
}
