using FluentValidation;
using FluentValidation.Results;
using Spendify.Application.Common.Errors;
using Spendify.Application.Transactions.Policies;

namespace Spendify.Application.Transactions.Commands.CreateTransaction;

public class CreateTransactionCommandValidator: AbstractValidator<CreateTransactionCommand>
{
    public CreateTransactionCommandValidator()
    {
        RuleFor(x => x.WalletId)
            .NotEmpty().WithErrorCode(ValidationErrors.WalletIdRequired);

        RuleFor(x => x.Type)
            .Cascade(CascadeMode.Stop)
            .NotNull().WithErrorCode(ValidationErrors.TransactionTypeRequired)
            .IsInEnum().WithErrorCode(ValidationErrors.InvalidTransactionType);

        RuleFor(x => x.Category)
            .Cascade(CascadeMode.Stop)
            .NotNull().WithErrorCode(ValidationErrors.TransactionCategoryRequired)
            .IsInEnum().WithErrorCode(ValidationErrors.InvalidTransactionCategory);

        RuleFor(x => x.Amount)
            .Cascade(CascadeMode.Stop)
            .NotNull().WithErrorCode(ValidationErrors.TransactionAmountRequired)
            .GreaterThanOrEqualTo(TransactionPolicy.AmountMin)
            .WithErrorCode(ValidationErrors.TransactionAmountTooSmall)
            .LessThanOrEqualTo(TransactionPolicy.AmountMax)
            .WithErrorCode(ValidationErrors.TransactionAmountTooLarge);

        RuleFor(x => x.TransactionDate)
            .NotNull().WithErrorCode(ValidationErrors.TransactionDateRequired);

        RuleFor(x => x.Note)
            .MaximumLength(TransactionPolicy.NoteMaxLength)
            .WithErrorCode(ValidationErrors.TransactionNoteTooLong)
            .When(command => command.Note is not null);
    }

    protected override bool PreValidate(ValidationContext<CreateTransactionCommand> context, ValidationResult result)
    {
        if (context.InstanceToValidate is not { } command)
            return true;

        if (command.Note is not null)
            command.Note = command.Note.Trim();

        return true;
    }
}
