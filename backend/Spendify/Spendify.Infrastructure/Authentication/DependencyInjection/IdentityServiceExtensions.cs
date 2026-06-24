using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Spendify.Application.Auth.Policies;
using Spendify.Infrastructure.Authentication;
using Spendify.Infrastructure.Data;

namespace Spendify.Infrastructure.Authentication.DependencyInjection;

public static class IdentityServiceExtensions
{
    public static IServiceCollection AddSpendifyIdentity(this IServiceCollection services)
    {
        services.AddIdentityCore<AppUser>(options =>
            {
                // FluentValidation is the user-facing source of truth; mirror PasswordPolicy here as a backup.
                options.Password.RequiredLength = PasswordPolicy.MinLength;
                options.Password.RequiredUniqueChars = 0;
                options.Password.RequireDigit = PasswordPolicy.RequireDigit;
                options.Password.RequireLowercase = PasswordPolicy.RequireLowercase;
                options.Password.RequireUppercase = PasswordPolicy.RequireUppercase;
                options.Password.RequireNonAlphanumeric = PasswordPolicy.RequireNonAlphanumeric;
                options.User.RequireUniqueEmail = true;
                options.SignIn.RequireConfirmedEmail = false;
            }).AddRoles<IdentityRole<Guid>>()
            .AddEntityFrameworkStores<AppDbContext>();

        return services;
    }
}
