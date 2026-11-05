using Spendify.Application.Common.Errors;

namespace Spendify.Application.Categories;

public static class CategoryErrors
{
    public static readonly AppError Unauthorized = new("UNAUTHORIZED", statusCode: 401);

    public static readonly AppError NotFound = new("CATEGORY_NOT_FOUND", statusCode: 404);

    public static readonly AppError NameDuplicate = new("CATEGORY_NAME_DUPLICATE", statusCode: 409);

    public static readonly AppError SystemSeedImmutable = new("CATEGORY_SYSTEM_SEED_IMMUTABLE", statusCode: 409);
}
