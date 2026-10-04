using FluentValidation;
using Spendify.Application.Common.Errors;
using Spendify.Application.Transactions.Policies;

namespace Spendify.Application.Transactions.Queries;

public class GetWalletTransactionsQueryValidator: AbstractValidator<GetWalletTransactionsQuery>
{
    public GetWalletTransactionsQueryValidator()
    {
        RuleFor(x => x.WalletId)
            .NotEmpty().WithErrorCode(ValidationErrors.WalletIdRequired);

        RuleFor(x => x.Page)
            .GreaterThanOrEqualTo(1).WithErrorCode(ValidationErrors.PageTooSmall)
            .Must((query, page) => (long)(page - 1) * query.PageSize <= TransactionPolicy.MaxSkipOffset)
            .WithErrorCode(ValidationErrors.PageTooLarge);

        RuleFor(x => x.PageSize)
            .GreaterThanOrEqualTo(1).WithErrorCode(ValidationErrors.PageSizeTooSmall)
            .LessThanOrEqualTo(TransactionPolicy.MaxPageSize)
            .WithErrorCode(ValidationErrors.PageSizeTooLarge);
    }
}
