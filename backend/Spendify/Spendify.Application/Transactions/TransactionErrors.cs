using Spendify.Application.Common.Errors;

namespace Spendify.Application.Transactions;

public static class TransactionErrors
{
    public static readonly AppError Unauthorized = new("UNAUTHORIZED", statusCode: 401);

    public static readonly AppError WalletNotFound = new("WALLET_NOT_FOUND", statusCode: 404);

    public static readonly AppError NotFound = new("TRANSACTION_NOT_FOUND", statusCode: 404);
}
