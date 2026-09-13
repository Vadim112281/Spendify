using MediatR;
using Spendify.Application.Common.Interfaces;
using Spendify.Application.Common.Results;
using Spendify.Application.Wallets.Interfaces;

namespace Spendify.Application.Wallets.Queries;

public class GetUserWalletsHandler(
    ICurrentUserService _currentUser,
    IWalletService _walletService
): IRequestHandler<GetUserWalletsQuery, AppResult<List<WalletResult>>>
{
    public async Task<AppResult<List<WalletResult>>> Handle(
        GetUserWalletsQuery request,
        CancellationToken cancellationToken)
    {
        if (_currentUser.UserId is not Guid userId)
            return AppResult<List<WalletResult>>.Failure(WalletErrors.Unauthorized);

        var wallets = await _walletService.GetByUserIdAsync(userId, cancellationToken);

        return AppResult<List<WalletResult>>.Success(wallets);
    }
}
