using MediatR;
using Spendify.Application.Common.Interfaces;
using Spendify.Application.Common.Results;
using Spendify.Application.Wallets.Interfaces;

namespace Spendify.Application.Wallets.Commands.DeleteWallet;

public class DeleteWalletHandler(
    ICurrentUserService _currentUser,
    IWalletService _walletService
): IRequestHandler<DeleteWalletCommand, AppResult<bool>>
{
    public async Task<AppResult<bool>> Handle(
        DeleteWalletCommand request,
        CancellationToken cancellationToken)
    {
        if (_currentUser.UserId is not Guid userId)
            return AppResult<bool>.Failure(WalletErrors.Unauthorized);

        return await _walletService.DeleteAsync(userId, request.WalletId, cancellationToken);
    }
}
