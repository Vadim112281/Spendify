using MediatR;
using Spendify.Application.Common.Results;

namespace Spendify.Application.Transactions.Commands.DeleteTransaction;

public record DeleteTransactionCommand(Guid WalletId, Guid TransactionId): IRequest<AppResult<bool>>;
