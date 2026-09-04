using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Spendify.Application.Auth.Interfaces;
using Spendify.Application.Common.Interfaces;
using Spendify.Application.Common.Options;
using Spendify.Infrastructure.Authentication;
using Spendify.Infrastructure.Authentication.DependencyInjection;
using Spendify.Infrastructure.Data;

namespace Spendify.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException(
                "ConnectionStrings:DefaultConnection is not configured. " +
                "Use user-secrets or the ConnectionStrings__DefaultConnection environment variable.");
        }

        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseNpgsql(connectionString);
        });

        services.AddOptions<JwtSettings>()
            .Bind(configuration.GetSection("Jwt"))
            .Validate(
                settings => !string.IsNullOrWhiteSpace(settings.Key),
                "Jwt:Key must be configured (user-secrets or Jwt__Key environment variable).")
            .Validate(
                settings => Encoding.UTF8.GetByteCount(settings.Key) >= 32,
                "Jwt:Key must be at least 32 UTF-8 bytes.")
            .Validate(
                settings => !string.IsNullOrWhiteSpace(settings.Issuer),
                "Jwt:Issuer must be configured.")
            .Validate(
                settings => !string.IsNullOrWhiteSpace(settings.Audience),
                "Jwt:Audience must be configured.")
            .Validate(
                settings => settings.ExpiryMinutes > 0,
                "Jwt:ExpiryMinutes must be greater than 0.")
            .ValidateOnStart();
        
        services.AddSpendifyJwtAuthentication(configuration);
        
        services.AddScoped<ITokenService, JwtTokenService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddSpendifyIdentity();

        return services;
    }
}