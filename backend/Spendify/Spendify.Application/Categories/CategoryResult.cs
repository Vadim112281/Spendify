using Spendify.Domain.Enums;

namespace Spendify.Application.Categories;

public record CategoryResult(
    Guid CategoryId,
    string Name,
    string IconKey,
    CategoryKind Kind,
    bool IsSystemSeed,
    DateTime CreatedAtUtc);
