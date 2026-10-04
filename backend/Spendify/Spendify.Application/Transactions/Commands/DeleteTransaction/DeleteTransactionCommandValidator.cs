using FluentValidation;
using Spendify.Application.Common.Errors;

namespace Spendify.Application.Transactions.Commands.DeleteTransaction;

public class DeleteTransactionCommandValidator: AbstractValidator<DeleteTransactionCommand>
{
    public DeleteTransactionCommandValidator()
    {
        RuleFor(x => x.WalletId)
            .NotEmpty().WithErrorCode(ValidationErrors.WalletIdRequired);

        RuleFor(x => x.TransactionId)
            .NotEmpty().WithErrorCode(ValidationErrors.TransactionIdRequired);
    }
}
