using Spendify.Domain.Enums;

namespace Spendify.Application.Transactions.Contracts;

public record CreateTransactionRequest(
    TransactionType Type,
    TransactionCategory Category,
    decimal Amount,
    string? Note,
    DateOnly TransactionDate);
