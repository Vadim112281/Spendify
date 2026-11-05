using MediatR;
using Spendify.Application.Categories;
using Spendify.Application.Common.Results;

namespace Spendify.Application.Categories.Commands.UpdateCategory;

public class UpdateCategoryCommand: IRequest<AppResult<CategoryResult>>
{
    public Guid CategoryId { get; set; }
    public string? Name { get; set; }
    public string? IconKey { get; set; }
}
