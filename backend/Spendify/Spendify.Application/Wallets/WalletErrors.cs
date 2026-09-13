using Spendify.Application.Common.Errors;

namespace Spendify.Application.Wallets;

public static class WalletErrors
{
    public static readonly AppError Unauthorized = new("UNAUTHORIZED", statusCode: 401);

    public static readonly AppError NotFound = new("WALLET_NOT_FOUND", statusCode: 404);
}
