using Spendify.Domain.Enums;

namespace Spendify.Application.Categories.Contracts;

public record CreateCategoryRequest(
    string Name,
    string IconKey,
    CategoryKind Kind);
