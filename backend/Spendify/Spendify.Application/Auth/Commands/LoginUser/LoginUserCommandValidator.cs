using FluentValidation;
using FluentValidation.Results;
using Spendify.Application.Auth.Policies;
using Spendify.Application.Common.Errors;

namespace Spendify.Application.Auth.Commands.LoginUser;

public class LoginUserCommandValidator: AbstractValidator<LoginUserCommand>
{
    public LoginUserCommandValidator()
    {
        RuleFor(x => x.Email)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithErrorCode(ValidationErrors.EmailRequired)
            .EmailAddress().WithErrorCode(ValidationErrors.InvalidEmail)
            .MaximumLength(EmailPolicy.MaxLength).WithErrorCode(ValidationErrors.EmailTooLong);

        RuleFor(x => x.Password)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithErrorCode(ValidationErrors.PasswordRequired)
            .MaximumLength(PasswordPolicy.MaxLength).WithErrorCode(ValidationErrors.PasswordTooLong);
    }

    protected override bool PreValidate(ValidationContext<LoginUserCommand> context, ValidationResult result)
    {
        if (context.InstanceToValidate is not { } command)
            return true;

        if (command.Email is not null)
            command.Email = EmailPolicy.Normalize(command.Email);

        if (command.Password is not null)
            command.Password = command.Password.Trim();

        return true;
    }
}
