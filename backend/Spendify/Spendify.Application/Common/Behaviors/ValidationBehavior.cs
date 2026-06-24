using FluentValidation;
using MediatR;
using Spendify.Application.Common.Errors;
using Spendify.Application.Common.Results;

namespace Spendify.Application.Common.Behaviors;

public class ValidationBehavior<TRequest, TResult>(
    IEnumerable<IValidator<TRequest>> _validators
): IPipelineBehavior<TRequest, AppResult<TResult>>
    where TRequest : IRequest<AppResult<TResult>>
{
    public async Task<AppResult<TResult>> Handle(
        TRequest request,
        RequestHandlerDelegate<AppResult<TResult>> next,
        CancellationToken cancellationToken)
    {
        if (!_validators.Any())
            return await next();

        var context = new ValidationContext<TRequest>(request);

        var validationResults = await Task.WhenAll(
            _validators.Select(validator => validator.ValidateAsync(context, cancellationToken)));

        var failures = validationResults
            .SelectMany(result => result.Errors)
            .Where(failure => failure is not null)
            .ToList();

        if (failures.Count == 0)
            return await next();

        var fieldErrors = failures
            .GroupBy(failure => ToCamelCase(failure.PropertyName))
            .ToDictionary(
                group => group.Key,
                group => group.First().ErrorCode ?? ValidationErrors.Failed);

        return AppResult<TResult>.Failure(ValidationErrors.FromFieldErrors(fieldErrors));
    }

    private static string ToCamelCase(string propertyName)
    {
        if (string.IsNullOrEmpty(propertyName) || char.IsLower(propertyName[0]))
            return propertyName;

        return char.ToLowerInvariant(propertyName[0]) + propertyName[1..];
    }
}
