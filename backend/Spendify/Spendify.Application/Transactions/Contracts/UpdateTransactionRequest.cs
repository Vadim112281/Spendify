using Spendify.Domain.Enums;

namespace Spendify.Application.Transactions.Contracts;

public record UpdateTransactionRequest(
    TransactionType? Type,
    Guid? CategoryId,
    decimal? Amount,
    string? Note,
    DateOnly? TransactionDate);
