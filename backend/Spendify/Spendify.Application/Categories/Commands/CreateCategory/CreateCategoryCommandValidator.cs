using FluentValidation;
using FluentValidation.Results;
using Spendify.Application.Categories.Policies;
using Spendify.Application.Common.Errors;

namespace Spendify.Application.Categories.Commands.CreateCategory;

public class CreateCategoryCommandValidator: AbstractValidator<CreateCategoryCommand>
{
    public CreateCategoryCommandValidator()
    {
        RuleFor(x => x.Kind)
            .Cascade(CascadeMode.Stop)
            .NotNull().WithErrorCode(ValidationErrors.CategoryKindRequired)
            .IsInEnum().WithErrorCode(ValidationErrors.InvalidCategoryKind);

        RuleFor(x => x.Name)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithErrorCode(ValidationErrors.CategoryNameRequired)
            .MaximumLength(CategoryPolicy.NameMaxLength)
            .WithErrorCode(ValidationErrors.CategoryNameTooLong);

        RuleFor(x => x.IconKey)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithErrorCode(ValidationErrors.CategoryIconKeyRequired)
            .MaximumLength(CategoryPolicy.IconKeyMaxLength)
            .WithErrorCode(ValidationErrors.CategoryIconKeyTooLong)
            .Must(CategoryIconKeysPolicy.IsAllowed)
            .WithErrorCode(ValidationErrors.InvalidCategoryIconKey);
    }

    protected override bool PreValidate(ValidationContext<CreateCategoryCommand> context, ValidationResult result)
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
