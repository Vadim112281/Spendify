using MediatR;
using Spendify.Application.Common.Results;
using Spendify.Domain.Enums;

namespace Spendify.Application.Transactions.Commands.UpdateTransaction;

public class UpdateTransactionCommand: IRequest<AppResult<TransactionResult>>
{
    public Guid WalletId { get; set; }
    public Guid TransactionId { get; set; }
    public TransactionType? Type { get; set; }
    public TransactionCategory? Category { get; set; }
    public decimal? Amount { get; set; }
    public string? Note { get; set; }
    public DateOnly? TransactionDate { get; set; }
}
