using Spendify.Domain.Enums;

namespace Spendify.Application.Transactions.Contracts;

public record UpdateTransactionRequest(
    TransactionType? Type,
    TransactionCategory? Category,
    decimal? Amount,
    string? Note,
    DateOnly? TransactionDate);
