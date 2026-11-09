using Spendify.Application.Categories.Contracts;
using Spendify.Application.Common.Results;

namespace Spendify.Application.Categories.Interfaces;

public interface IUserCategoryService
{
    Task<List<CategoryResult>> GetByUserIdAsync(
        Guid userId,
        CancellationToken cancellationToken = default);

    Task<AppResult<CategoryResult>> CreateAsync(
        Guid userId,
        CreateCategoryRequest request,
        CancellationToken cancellationToken = default);

    Task<AppResult<CategoryResult>> UpdateAsync(
        Guid userId,
        Guid categoryId,
        UpdateCategoryRequest request,
        CancellationToken cancellationToken = default);
}
