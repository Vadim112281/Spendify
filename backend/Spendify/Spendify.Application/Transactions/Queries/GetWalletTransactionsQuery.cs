using MediatR;
using Spendify.Application.Common.Results;

namespace Spendify.Application.Transactions.Queries;

public record GetWalletTransactionsQuery(
    Guid WalletId,
    int Page,
    int PageSize): IRequest<AppResult<PagedResult<TransactionResult>>>;
