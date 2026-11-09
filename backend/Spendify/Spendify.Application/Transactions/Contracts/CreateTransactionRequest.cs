using Spendify.Domain.Enums;

namespace Spendify.Application.Transactions.Contracts;

public record CreateTransactionRequest(
    TransactionType Type,
    Guid CategoryId,
    decimal Amount,
    string? Note,
    DateOnly TransactionDate);
