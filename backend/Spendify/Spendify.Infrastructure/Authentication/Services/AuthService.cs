using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Spendify.Application.Auth.Errors;
using Spendify.Application.Auth.Interfaces;
using Spendify.Application.Common.Results;
using Spendify.Infrastructure.Authentication.ErrorMapping;
using Spendify.Infrastructure.Categories;
using Spendify.Infrastructure.Data;

namespace Spendify.Infrastructure.Authentication;

public class AuthService(
    AppDbContext _dbContext,
    UserManager<AppUser> _userManager
): IAuthService
{
    public async Task<AppResult<(Guid UserId, string Email)>> RegisterAsync(
        string firstName,
        string lastName,
        string email,
        string password,
        CancellationToken cancellationToken = default)
    {
        await using var transaction = await _dbContext.Database.BeginTransactionAsync(cancellationToken);

        var user = new AppUser
        {
            Id = Guid.NewGuid(),
            FirstName = firstName,
            LastName = lastName,
            Email = email,
            UserName = email,
            CreatedAtUtc = DateTime.UtcNow,
        };

        // TODO: Pass cancellationToken to CreateAsync.
        // TODO: On duplicate-email race, return 409 instead of 500.
        var identityResult = await _userManager.CreateAsync(user, password);
        if (!identityResult.Succeeded)
        {
            await transaction.RollbackAsync(cancellationToken);
            return AppResult<(Guid UserId, string Email)>.Failure(
                IdentityRegistrationErrorMapper.Map(identityResult.Errors));
        }

        UserCategorySeedHelper.StageDefaultSystemCategoriesForNewUser(_dbContext, user.Id);

        try
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);
        }
        catch (DbUpdateException)
        {
            await transaction.RollbackAsync(cancellationToken);
            return AppResult<(Guid UserId, string Email)>.Failure(RegistrationErrors.RegistrationSetupFailed);
        }

        return AppResult<(Guid UserId, string Email)>.Success((user.Id, user.Email!));
    }

    // TODO: On failed login — track attempts and lock account after too many tries;
    // add rate limiting on /api/auth/login and /api/auth/register.
    public async Task<AppResult<(Guid UserId, string Email)>> LoginAsync(
        string email,
        string password,
        CancellationToken cancellationToken = default)
    {
        // TODO: Pass cancellationToken to FindByEmailAsync.
        var user = await _userManager.FindByEmailAsync(email);
        if (user is null)
            return AppResult<(Guid UserId, string Email)>.Failure(LoginErrors.InvalidCredentials);

        var passwordValid = await _userManager.CheckPasswordAsync(user, password);
        if (!passwordValid)
            return AppResult<(Guid UserId, string Email)>.Failure(LoginErrors.InvalidCredentials);

        return AppResult<(Guid UserId, string Email)>.Success((user.Id, user.Email!));
    }
}
