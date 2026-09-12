using FluentValidation;
using Spendify.Application.Common.Errors;

namespace Spendify.Application.Wallets.Commands.DeleteWallet;

public class DeleteWalletCommandValidator: AbstractValidator<DeleteWalletCommand>
{
    public DeleteWalletCommandValidator()
    {
        RuleFor(x => x.WalletId)
            .NotEmpty().WithErrorCode(ValidationErrors.WalletIdRequired);
    }
}
