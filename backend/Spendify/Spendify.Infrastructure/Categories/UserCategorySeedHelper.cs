using Spendify.Application.Categories.Policies;
using Spendify.Domain.Enums;
using Spendify.Domain.Models;
using Spendify.Infrastructure.Data;

namespace Spendify.Infrastructure.Categories;

internal static class UserCategorySeedHelper
{
    public static void StageDefaultSystemCategoriesForNewUser(AppDbContext dbContext, Guid userId)
    {
        var createdAtUtc = DateTime.UtcNow;
        var normalizedName = CategorySeedPolicy.OtherDisplayName.Trim().ToUpperInvariant();

        foreach (var kind in new[] {CategoryKind.Expense, CategoryKind.Income})
        {
            dbContext.UserCategories.Add(
                new UserCategory
                {
                    UserCategoryId = Guid.NewGuid(),
                    UserId = userId,
                    Name = CategorySeedPolicy.OtherDisplayName,
                    NormalizedName = normalizedName,
                    IconKey = CategorySeedPolicy.OtherIconKey,
                    Kind = kind,
                    IsSystemSeed = true,
                    CreatedAtUtc = createdAtUtc,
                });
        }
    }
}
