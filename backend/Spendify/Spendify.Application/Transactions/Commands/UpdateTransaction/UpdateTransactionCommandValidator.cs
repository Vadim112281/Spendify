using FluentValidation;
using FluentValidation.Results;
using Spendify.Application.Common.Errors;
using Spendify.Application.Transactions.Policies;

namespace Spendify.Application.Transactions.Commands.UpdateTransaction;

public class UpdateTransactionCommandValidator: AbstractValidator<UpdateTransactionCommand>
{
    public UpdateTransactionCommandValidator()
    {
        RuleFor(x => x.WalletId)
            .NotEmpty().WithErrorCode(ValidationErrors.WalletIdRequired);

        RuleFor(x => x.TransactionId)
            .NotEmpty().WithErrorCode(ValidationErrors.TransactionIdRequired);

        RuleFor(x => x)
            .Must(command =>
                command.Type.HasValue
                || command.Category.HasValue
                || command.Amount.HasValue
                || command.Note is not null
                || command.TransactionDate.HasValue)
            .WithErrorCode(ValidationErrors.TransactionUpdateFieldsRequired);

        RuleFor(x => x.Type)
            .Cascade(CascadeMode.Stop)
            .IsInEnum().WithErrorCode(ValidationErrors.InvalidTransactionType)
            .When(command => command.Type.HasValue);

        RuleFor(x => x.Category)
            .Cascade(CascadeMode.Stop)
            .IsInEnum().WithErrorCode(ValidationErrors.InvalidTransactionCategory)
            .When(command => command.Category.HasValue);

        RuleFor(x => x.Amount)
            .Cascade(CascadeMode.Stop)
            .GreaterThanOrEqualTo(TransactionPolicy.AmountMin)
            .WithErrorCode(ValidationErrors.TransactionAmountTooSmall)
            .LessThanOrEqualTo(TransactionPolicy.AmountMax)
            .WithErrorCode(ValidationErrors.TransactionAmountTooLarge)
            .When(command => command.Amount.HasValue);

        RuleFor(x => x.Note)
            .MaximumLength(TransactionPolicy.NoteMaxLength)
            .WithErrorCode(ValidationErrors.TransactionNoteTooLong)
            .When(command => command.Note is not null);
    }

    protected override bool PreValidate(ValidationContext<UpdateTransactionCommand> context, ValidationResult result)
    {
        if (context.InstanceToValidate is not { } command)
            return true;

        if (command.Note is not null)
            command.Note = command.Note.Trim();

        return true;
    }
}
