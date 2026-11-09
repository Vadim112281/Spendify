using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Spendify.Api.Mapping;
using Spendify.Application.Categories;
using Spendify.Application.Categories.Commands.CreateCategory;
using Spendify.Application.Categories.Commands.UpdateCategory;
using Spendify.Application.Categories.Queries;

namespace Spendify.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/categories")]
public class CategoriesController(IMediator _mediator): ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<CategoryResult>>> GetByUser(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetUserCategoriesQuery(), cancellationToken);

        return result.ToActionResult();
    }

    [HttpPost]
    public async Task<ActionResult<CategoryResult>> Create(
        CreateCategoryCommand command,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(command, cancellationToken);

        return result.ToCreatedResult();
    }

    [HttpPatch("{categoryId:guid}")]
    public async Task<ActionResult<CategoryResult>> Update(
        Guid categoryId,
        UpdateCategoryCommand command,
        CancellationToken cancellationToken)
    {
        command.CategoryId = categoryId;
        var result = await _mediator.Send(command, cancellationToken);

        return result.ToActionResult();
    }
}
