using MediatR;
using Spendify.Application.Common.Results;

namespace Spendify.Application.Wallets.Commands.DeleteWallet;

public record DeleteWalletCommand(Guid WalletId): IRequest<AppResult<bool>>;
