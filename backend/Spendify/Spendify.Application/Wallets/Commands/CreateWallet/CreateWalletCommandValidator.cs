using FluentValidation;
using FluentValidation.Results;
using Spendify.Application.Common.Errors;
using Spendify.Application.Wallets.Policies;

namespace Spendify.Application.Wallets.Commands.CreateWallet;

public class CreateWalletCommandValidator: AbstractValidator<CreateWalletCommand>
{
    public CreateWalletCommandValidator()
    {
        RuleFor(x => x.WalletType)
            .Cascade(CascadeMode.Stop)
            .NotNull().WithErrorCode(ValidationErrors.WalletTypeRequired)
            .IsInEnum().WithErrorCode(ValidationErrors.InvalidWalletType);

        RuleFor(x => x.CurrencyType)
            .Cascade(CascadeMode.Stop)
            .NotNull().WithErrorCode(ValidationErrors.CurrencyTypeRequired)
            .IsInEnum().WithErrorCode(ValidationErrors.InvalidCurrencyType);

        RuleFor(x => x.WalletName)
            .MaximumLength(WalletPolicy.NameMaxLength).WithErrorCode(ValidationErrors.WalletNameTooLong)
            .When(command => command.WalletName is not null);
    }

    protected override bool PreValidate(ValidationContext<CreateWalletCommand> context, ValidationResult result)
    {
        if (context.InstanceToValidate is not { } command)
            return true;

        if (command.WalletName is not null)
            command.WalletName = command.WalletName.Trim();

        return true;
    }
}
