using MediatR;
using Spendify.Application.Common.Results;
using Spendify.Domain.Enums;

namespace Spendify.Application.Wallets.Commands.CreateWallet;

public class CreateWalletCommand: IRequest<AppResult<WalletResult>>
{
    public string? WalletName { get; set; }
    public WalletType? WalletType { get; set; }
    public CurrencyType? CurrencyType { get; set; }
}
