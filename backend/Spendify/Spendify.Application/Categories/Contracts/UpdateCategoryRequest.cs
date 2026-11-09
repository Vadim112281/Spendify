namespace Spendify.Application.Categories.Contracts;

public record UpdateCategoryRequest(
    string? Name,
    string? IconKey);
