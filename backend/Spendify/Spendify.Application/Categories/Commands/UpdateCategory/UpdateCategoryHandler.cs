using MediatR;
using Spendify.Application.Categories.Contracts;
using Spendify.Application.Categories.Interfaces;
using Spendify.Application.Common.Interfaces;
using Spendify.Application.Common.Results;

namespace Spendify.Application.Categories.Commands.UpdateCategory;

public class UpdateCategoryHandler(
    ICurrentUserService _currentUser,
    IUserCategoryService _categoryService
): IRequestHandler<UpdateCategoryCommand, AppResult<CategoryResult>>
{
    public async Task<AppResult<CategoryResult>> Handle(
        UpdateCategoryCommand request,
        CancellationToken cancellationToken)
    {
        if (_currentUser.UserId is not Guid userId)
            return AppResult<CategoryResult>.Failure(CategoryErrors.Unauthorized);

        var updateRequest = new UpdateCategoryRequest(request.Name, request.IconKey);

        var updateResult = await _categoryService.UpdateAsync(
            userId,
            request.CategoryId,
            updateRequest,
            cancellationToken);

        if (updateResult.IsFailure)
            return AppResult<CategoryResult>.Failure(updateResult.Error!);

        return AppResult<CategoryResult>.Success(updateResult.Value!);
    }
}
