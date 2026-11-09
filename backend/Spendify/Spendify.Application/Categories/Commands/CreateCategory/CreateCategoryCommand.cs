using MediatR;
using Spendify.Application.Categories;
using Spendify.Application.Common.Results;
using Spendify.Domain.Enums;

namespace Spendify.Application.Categories.Commands.CreateCategory;

public class CreateCategoryCommand: IRequest<AppResult<CategoryResult>>
{
    public string? Name { get; set; }
    public string? IconKey { get; set; }
    public CategoryKind? Kind { get; set; }
}
