using Microsoft.AspNetCore.Mvc;
using Spendify.Application.Common.Results;

namespace Spendify.Api.Mapping;

public static class AppResultExtensions
{
    public static ActionResult<T> ToActionResult<T>(this AppResult<T> result)
    {
        if (result.IsSuccess)
            return new OkObjectResult(result.Value);

        return ToErrorObjectResult(result);
    }

    public static ActionResult<T> ToCreatedResult<T>(this AppResult<T> result)
    {
        if (result.IsSuccess)
        {
            return new ObjectResult(result.Value)
            {
                StatusCode = StatusCodes.Status201Created,
            };
        }

        return ToErrorObjectResult(result);
    }

    public static IActionResult ToNoContentResult<T>(this AppResult<T> result)
    {
        if (result.IsSuccess)
            return new NoContentResult();

        return ToErrorObjectResult(result);
    }

    private static ObjectResult ToErrorObjectResult<T>(AppResult<T> result)
    {
        var error = result.Error!;

        if (error.FieldErrors is { Count: > 0 })
        {
            return new ObjectResult(new
            {
                code = error.Code,
                statusCode = error.StatusCode,
                errors = error.FieldErrors,
            })
            {
                StatusCode = error.StatusCode,
            };
        }

        return new ObjectResult(new
        {
            code = error.Code,
            statusCode = error.StatusCode,
        })
        {
            StatusCode = error.StatusCode,
        };
    }
}
