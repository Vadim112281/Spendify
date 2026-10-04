using Spendify.Domain.Enums;

namespace Spendify.Application.Transactions;

public record TransactionResult(
    Guid TransactionId,
    Guid WalletId,
    TransactionType Type,
    TransactionCategory Category,
    decimal Amount,
    string? Note,
    DateOnly TransactionDate,
    DateTime CreatedAtUtc);
