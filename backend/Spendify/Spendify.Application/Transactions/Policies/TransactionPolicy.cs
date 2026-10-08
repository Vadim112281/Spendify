namespace Spendify.Application.Transactions.Policies;

public static class TransactionPolicy
{
    public const int DefaultPageSize = 10;
    public const int MaxPageSize = 20;
    public const int MaxSkipOffset = 1_000_000;

    // Duplicated in AppDbContext (EF) — keep in sync.
    public const int NoteMaxLength = 200;

    public const decimal AmountMin = 0.01m;
    public const decimal AmountMax = 999_999_999.99m;
}
