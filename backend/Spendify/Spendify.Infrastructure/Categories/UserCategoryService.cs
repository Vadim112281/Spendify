using Microsoft.EntityFrameworkCore;
using Npgsql;
using Spendify.Application.Categories;
using Spendify.Application.Categories.Contracts;
using Spendify.Application.Categories.Interfaces;
using Spendify.Application.Common.Results;
using Spendify.Domain.Enums;
using Spendify.Domain.Models;
using Spendify.Infrastructure.Data;

namespace Spendify.Infrastructure.Categories;

public class UserCategoryService(AppDbContext _dbContext): IUserCategoryService
{
    public async Task<List<CategoryResult>> GetByUserIdAsync(
        Guid userId,
        CancellationToken cancellationToken = default) =>
        await _dbContext.UserCategories
            .AsNoTracking()
            .Where(category => category.UserId == userId)
            .OrderBy(category => category.Kind)
            .ThenBy(category => category.IsSystemSeed)
            .ThenBy(category => category.Name)
            .Select(category => new CategoryResult(
                category.UserCategoryId,
                category.Name,
                category.IconKey,
                category.Kind,
                category.IsSystemSeed,
                category.CreatedAtUtc))
            .ToListAsync(cancellationToken);

    public async Task<AppResult<CategoryResult>> CreateAsync(
        Guid userId,
        CreateCategoryRequest request,
        CancellationToken cancellationToken = default)
    {
        var displayName = NormalizeDisplayName(request.Name);
        var normalizedName = NormalizeForUniqueness(displayName);

        if (await NameExistsForKindAsync(userId, request.Kind, normalizedName, null, cancellationToken))
            return AppResult<CategoryResult>.Failure(CategoryErrors.NameDuplicate);

        var category = new UserCategory
        {
            UserCategoryId = Guid.NewGuid(),
            UserId = userId,
            Name = displayName,
            NormalizedName = normalizedName,
            IconKey = request.IconKey,
            Kind = request.Kind,
            IsSystemSeed = false,
            CreatedAtUtc = DateTime.UtcNow,
        };

        _dbContext.UserCategories.Add(category);

        try
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
        }
        // Unique index on (UserId, Kind, NormalizedName) only — treat 23505 as duplicate name (incl. concurrent POST race).
        catch (DbUpdateException exception) when (IsUniqueNameViolation(exception))
        {
            return AppResult<CategoryResult>.Failure(CategoryErrors.NameDuplicate);
        }

        return AppResult<CategoryResult>.Success(MapToResult(category));
    }

    public async Task<AppResult<CategoryResult>> UpdateAsync(
        Guid userId,
        Guid categoryId,
        UpdateCategoryRequest request,
        CancellationToken cancellationToken = default)
    {
        var category = await _dbContext.UserCategories
            .FirstOrDefaultAsync(
                item =>
                    item.UserCategoryId == categoryId
                    && item.UserId == userId,
                cancellationToken);

        if (category is null)
            return AppResult<CategoryResult>.Failure(CategoryErrors.NotFound);

        if (category.IsSystemSeed)
            return AppResult<CategoryResult>.Failure(CategoryErrors.SystemSeedImmutable);

        if (request.Name is not null)
        {
            var displayName = NormalizeDisplayName(request.Name);
            var normalizedName = NormalizeForUniqueness(displayName);

            if (await NameExistsForKindAsync(
                    userId,
                    category.Kind,
                    normalizedName,
                    categoryId,
                    cancellationToken))
                return AppResult<CategoryResult>.Failure(CategoryErrors.NameDuplicate);

            category.Name = displayName;
            category.NormalizedName = normalizedName;
        }

        if (request.IconKey is not null)
            category.IconKey = request.IconKey;

        try
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
        }
        // Same index as CreateAsync — 23505 here means duplicate rename or concurrent PATCH race.
        catch (DbUpdateException exception) when (IsUniqueNameViolation(exception))
        {
            return AppResult<CategoryResult>.Failure(CategoryErrors.NameDuplicate);
        }

        return AppResult<CategoryResult>.Success(MapToResult(category));
    }

    private async Task<bool> NameExistsForKindAsync(
        Guid userId,
        CategoryKind kind,
        string normalizedName,
        Guid? excludeCategoryId,
        CancellationToken cancellationToken) =>
        await _dbContext.UserCategories
            .AsNoTracking()
            .AnyAsync(
                category =>
                    category.UserId == userId
                    && category.Kind == kind
                    && category.NormalizedName == normalizedName
                    && (excludeCategoryId == null || category.UserCategoryId != excludeCategoryId),
                cancellationToken);

    private static CategoryResult MapToResult(UserCategory category) =>
        new(
            category.UserCategoryId,
            category.Name,
            category.IconKey,
            category.Kind,
            category.IsSystemSeed,
            category.CreatedAtUtc);

    private static string NormalizeDisplayName(string name) => name.Trim();

    private static string NormalizeForUniqueness(string displayName) =>
        displayName.ToUpperInvariant();

    private static bool IsUniqueNameViolation(DbUpdateException exception) =>
        exception.InnerException is PostgresException postgresException
        && postgresException.SqlState == PostgresErrorCodes.UniqueViolation;
}
