using Spendify.Application.Common.Results;

namespace Spendify.Application.Auth.Interfaces;

public interface IAuthService
{
    Task<AppResult<(Guid UserId, string Email)>> RegisterAsync(
        string firstName,
        string lastName,
        string email,
        string password,
        CancellationToken cancellationToken = default);

    Task<AppResult<(Guid UserId, string Email)>> LoginAsync(
        string email,
        string password,
        CancellationToken cancellationToken = default);
}
