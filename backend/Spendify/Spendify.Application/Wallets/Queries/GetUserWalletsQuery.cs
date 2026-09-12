using MediatR;
using Spendify.Application.Common.Results;

namespace Spendify.Application.Wallets.Queries;

public record GetUserWalletsQuery: IRequest<AppResult<List<WalletResult>>>;
