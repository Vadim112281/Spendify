using MediatR;
using Spendify.Application.Categories.Contracts;
using Spendify.Application.Categories.Interfaces;
using Spendify.Application.Common.Interfaces;
using Spendify.Application.Common.Results;

namespace Spendify.Application.Categories.Commands.CreateCategory;

public class CreateCategoryHandler(
    ICurrentUserService _currentUser,
    IUserCategoryService _categoryService
): IRequestHandler<CreateCategoryCommand, AppResult<CategoryResult>>
{
    public async Task<AppResult<CategoryResult>> Handle(
        CreateCategoryCommand request,
        CancellationToken cancellationToken)
    {
        if (_currentUser.UserId is not Guid userId)
            return AppResult<CategoryResult>.Failure(CategoryErrors.Unauthorized);

        var createRequest = new CreateCategoryRequest(
            request.Name!,
            request.IconKey!,
            request.Kind!.Value);

        var createResult = await _categoryService.CreateAsync(userId, createRequest, cancellationToken);
        if (createResult.IsFailure)
            return AppResult<CategoryResult>.Failure(createResult.Error!);

        return AppResult<CategoryResult>.Success(createResult.Value!);
    }
}
