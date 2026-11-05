using MediatR;
using Spendify.Application.Categories;
using Spendify.Application.Common.Results;

namespace Spendify.Application.Categories.Queries;

public record GetUserCategoriesQuery: IRequest<AppResult<List<CategoryResult>>>;
