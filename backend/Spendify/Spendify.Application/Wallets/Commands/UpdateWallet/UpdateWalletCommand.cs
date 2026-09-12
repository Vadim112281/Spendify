using MediatR;
using Spendify.Application.Common.Results;
using Spendify.Domain.Enums;

namespace Spendify.Application.Wallets.Commands.UpdateWallet;

public class UpdateWalletCommand: IRequest<AppResult<WalletResult>>
{
    public Guid WalletId { get; set; }
    public string? WalletName { get; set; }
    public WalletType? WalletType { get; set; }
    public CurrencyType? CurrencyType { get; set; }
}
