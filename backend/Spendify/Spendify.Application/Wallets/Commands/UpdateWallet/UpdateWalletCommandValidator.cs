using FluentValidation;
using FluentValidation.Results;
using Spendify.Application.Common.Errors;
using Spendify.Application.Wallets.Policies;

namespace Spendify.Application.Wallets.Commands.UpdateWallet;

public class UpdateWalletCommandValidator: AbstractValidator<UpdateWalletCommand>
{
    public UpdateWalletCommandValidator()
    {
        RuleFor(x => x.WalletId)
            .NotEmpty().WithErrorCode(ValidationErrors.WalletIdRequired);

        RuleFor(x => x)
            .Must(command =>
                command.WalletName is not null
                || command.WalletType.HasValue
                || command.CurrencyType.HasValue)
            .WithErrorCode(ValidationErrors.WalletUpdateFieldsRequired);

        RuleFor(x => x.WalletType)
            .Cascade(CascadeMode.Stop)
            .IsInEnum().WithErrorCode(ValidationErrors.InvalidWalletType)
            .When(command => command.WalletType.HasValue);

        RuleFor(x => x.CurrencyType)
            .Cascade(CascadeMode.Stop)
            .IsInEnum().WithErrorCode(ValidationErrors.InvalidCurrencyType)
            .When(command => command.CurrencyType.HasValue);

        RuleFor(x => x.WalletName)
            .MaximumLength(WalletPolicy.NameMaxLength).WithErrorCode(ValidationErrors.WalletNameTooLong)
            .When(command => command.WalletName is not null);
    }

    protected override bool PreValidate(ValidationContext<UpdateWalletCommand> context, ValidationResult result)
    {
        if (context.InstanceToValidate is not { } command)
            return true;

        if (command.WalletName is not null)
            command.WalletName = command.WalletName.Trim();

        return true;
    }
}
