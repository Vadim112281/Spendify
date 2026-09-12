using MediatR;
using Spendify.Application.Common.Interfaces;
using Spendify.Application.Common.Results;
using Spendify.Application.Wallets.Interfaces;

namespace Spendify.Application.Wallets.Commands.CreateWallet;

public class CreateWalletHandler(
    ICurrentUserService _currentUser,
    IWalletService _walletService
): IRequestHandler<CreateWalletCommand, AppResult<WalletResult>>
{
    public async Task<AppResult<WalletResult>> Handle(
        CreateWalletCommand request,
        CancellationToken cancellationToken)
    {
        if (_currentUser.UserId is not Guid userId)
            return AppResult<WalletResult>.Failure(WalletErrors.Unauthorized);

        var wallet = await _walletService.CreateAsync(
            userId,
            request.WalletName,
            request.WalletType!.Value,
            request.CurrencyType!.Value,
            cancellationToken);

        return AppResult<WalletResult>.Success(wallet);
    }
}
