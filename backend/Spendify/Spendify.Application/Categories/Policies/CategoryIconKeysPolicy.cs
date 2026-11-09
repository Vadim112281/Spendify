namespace Spendify.Application.Categories.Policies;

public static class CategoryIconKeysPolicy
{
    public const string Other = "other";
    public const string Groceries = "groceries";
    public const string Cafe = "cafe";
    public const string Transport = "transport";
    public const string Subscription = "subscription";
    public const string Salary = "salary";
    public const string Pharmacy = "pharmacy";
    public const string Health = "health";
    public const string Shopping = "shopping";
    public const string Entertainment = "entertainment";
    public const string Home = "home";
    public const string Utilities = "utilities";
    public const string Education = "education";
    public const string Travel = "travel";
    public const string Food = "food";
    public const string Gifts = "gifts";
    public const string Insurance = "insurance";
    public const string Pets = "pets";
    public const string Fitness = "fitness";
    public const string Business = "business";

    private static readonly HashSet<string> AllowedKeys =
    [
        Other,
        Groceries,
        Cafe,
        Transport,
        Subscription,
        Salary,
        Pharmacy,
        Health,
        Shopping,
        Entertainment,
        Home,
        Utilities,
        Education,
        Travel,
        Food,
        Gifts,
        Insurance,
        Pets,
        Fitness,
        Business,
    ];

    public static bool IsAllowed(string iconKey) =>
        AllowedKeys.Contains(iconKey);
}
