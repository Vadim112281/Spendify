using Spendify.Domain.Enums;

namespace Spendify.Application.Transactions;

public record TransactionCategory(
    Guid CategoryId,
    string Name,
    string IconKey,
    CategoryKind Kind);
