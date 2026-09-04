using Microsoft.AspNetCore.Identity;
using Spendify.Domain.Models;

namespace Spendify.Infrastructure.Authentication;

public class AppUser : IdentityUser<Guid>
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public bool IsPremium { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public List<Wallet>? Wallets { get; set; }
}
