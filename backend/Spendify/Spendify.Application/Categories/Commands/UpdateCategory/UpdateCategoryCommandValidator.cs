using FluentValidation;
using FluentValidation.Results;
using Spendify.Application.Categories.Policies;
using Spendify.Application.Common.Errors;

namespace Spendify.Application.Categories.Commands.UpdateCategory;

public class UpdateCategoryCommandValidator: AbstractValidator<UpdateCategoryCommand>
{
    public UpdateCategoryCommandValidator()
    {
        RuleFor(x => x.CategoryId)
            .NotEmpty().WithErrorCode(ValidationErrors.CategoryIdRequired);

        RuleFor(x => x)
            .Must(command => command.Name is not null || command.IconKey is not null)
            .WithErrorCode(ValidationErrors.CategoryUpdateFieldsRequired);

        RuleFor(x => x.Name)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithErrorCode(ValidationErrors.CategoryNameRequired)
            .MaximumLength(CategoryPolicy.NameMaxLength)
            .WithErrorCode(ValidationErrors.CategoryNameTooLong)
            .When(command => command.Name is not null);

        RuleFor(x => x.IconKey)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithErrorCode(ValidationErrors.CategoryIconKeyRequired)
            .MaximumLength(CategoryPolicy.IconKeyMaxLength)
            .WithErrorCode(ValidationErrors.CategoryIconKeyTooLong)
            .Must(CategoryIconKeysPolicy.IsAllowed)
            .WithErrorCode(ValidationErrors.InvalidCategoryIconKey)
            .When(command => command.IconKey is not null);
    }

    protected override bool PreValidate(ValidationContext<UpdateCategoryCommand> context, ValidationResult result)
    {
        if (context.InstanceToValidate is not { } command)
            return true;

        if (command.Name is not null)
            command.Name = command.Name.Trim();

        if (command.IconKey is not null)
            command.IconKey = command.IconKey.Trim();

        return true;
    }
}
