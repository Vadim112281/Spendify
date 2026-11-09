using MediatR;
using Spendify.Application.Categories.Interfaces;
using Spendify.Application.Common.Interfaces;
using Spendify.Application.Common.Results;

namespace Spendify.Application.Categories.Queries;

public class GetUserCategoriesHandler(
    ICurrentUserService _currentUser,
    IUserCategoryService _categoryService
): IRequestHandler<GetUserCategoriesQuery, AppResult<List<CategoryResult>>>
{
    public async Task<AppResult<List<CategoryResult>>> Handle(
        GetUserCategoriesQuery request,
        CancellationToken cancellationToken)
    {
        if (_currentUser.UserId is not Guid userId)
            return AppResult<List<CategoryResult>>.Failure(CategoryErrors.Unauthorized);

        var categories = await _categoryService.GetByUserIdAsync(userId, cancellationToken);

        return AppResult<List<CategoryResult>>.Success(categories);
    }
}
