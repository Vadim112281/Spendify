using MediatR;
using Spendify.Application.Common.Interfaces;
using Spendify.Application.Common.Results;
using Spendify.Application.Wallets.Interfaces;

namespace Spendify.Application.Wallets.Commands.UpdateWallet;

public class UpdateWalletHandler(
    ICurrentUserService _currentUser,
    IWalletService _walletService
): IRequestHandler<UpdateWalletCommand, AppResult<WalletResult>>
{
    public async Task<AppResult<WalletResult>> Handle(
        UpdateWalletCommand request,
        CancellationToken cancellationToken)
    {
        if (_currentUser.UserId is not Guid userId)
            return AppResult<WalletResult>.Failure(WalletErrors.Unauthorized);

        var updateResult = await _walletService.UpdateAsync(
            userId,
            request.WalletId,
            request.WalletName,
            request.WalletType,
            request.CurrencyType,
            cancellationToken);

        if (updateResult.IsFailure)
            return AppResult<WalletResult>.Failure(updateResult.Error!);

        return AppResult<WalletResult>.Success(updateResult.Value!);
    }
}
