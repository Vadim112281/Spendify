using Spendify.Domain.Enums;

namespace Spendify.Domain.Models;

public class UserCategory
{
    public Guid UserCategoryId { get; set; }
    public Guid UserId { get; set; }
    public required string Name { get; set; }
    public required string NormalizedName { get; set; }
    public required string IconKey { get; set; }
    public CategoryKind Kind { get; set; }
    public bool IsSystemSeed { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
