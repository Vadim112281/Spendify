using FluentValidation;
using FluentValidation.Results;
using Spendify.Application.Auth.Policies;
using Spendify.Application.Common.Errors;

namespace Spendify.Application.Auth.Commands.RegisterUser;

public class RegisterUserCommandValidator: AbstractValidator<RegisterUserCommand>
{
    private const int NameMinLength = 2;
    private const int NameMaxLength = 50;

    public RegisterUserCommandValidator()
    {
        RuleFor(x => x.Email)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithErrorCode(ValidationErrors.EmailRequired)
            .EmailAddress().WithErrorCode(ValidationErrors.InvalidEmail)
            .MaximumLength(EmailPolicy.MaxLength).WithErrorCode(ValidationErrors.EmailTooLong);

        var passwordRule = RuleFor(x => x.Password)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithErrorCode(ValidationErrors.PasswordRequired)
            .MinimumLength(PasswordPolicy.MinLength).WithErrorCode(ValidationErrors.PasswordTooShort)
            .MaximumLength(PasswordPolicy.MaxLength).WithErrorCode(ValidationErrors.PasswordTooLong);

        if (PasswordPolicy.RequireDigit)
            passwordRule.Matches(@"\d").WithErrorCode(ValidationErrors.PasswordRequiresDigit);

        if (PasswordPolicy.RequireLowercase)
            passwordRule.Matches("[a-z]").WithErrorCode(ValidationErrors.PasswordRequiresLowercase);

        if (PasswordPolicy.RequireUppercase)
            passwordRule.Matches("[A-Z]").WithErrorCode(ValidationErrors.PasswordRequiresUppercase);

        if (PasswordPolicy.RequireNonAlphanumeric)
            passwordRule.Matches(@"[^a-zA-Z0-9]").WithErrorCode(ValidationErrors.PasswordRequiresNonAlphanumeric);

        RuleFor(x => x.FirstName)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithErrorCode(ValidationErrors.FirstNameRequired)
            .MinimumLength(NameMinLength).WithErrorCode(ValidationErrors.FirstNameTooShort)
            .MaximumLength(NameMaxLength).WithErrorCode(ValidationErrors.FirstNameTooLong);

        RuleFor(x => x.LastName)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithErrorCode(ValidationErrors.LastNameRequired)
            .MinimumLength(NameMinLength).WithErrorCode(ValidationErrors.LastNameTooShort)
            .MaximumLength(NameMaxLength).WithErrorCode(ValidationErrors.LastNameTooLong);
    }

    protected override bool PreValidate(ValidationContext<RegisterUserCommand> context, ValidationResult result)
    {
        if (context.InstanceToValidate is not { } command)
            return true;

        if (command.Email is not null)
            command.Email = EmailPolicy.Normalize(command.Email);

        if (command.Password is not null)
            command.Password = command.Password.Trim();

        if (command.FirstName is not null)
            command.FirstName = command.FirstName.Trim();

        if (command.LastName is not null)
            command.LastName = command.LastName.Trim();

        return true;
    }
}
