using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Spendify.Application.Common.Interfaces;

namespace Spendify.Infrastructure.Authentication;

public class CurrentUserService(IHttpContextAccessor _httpContextAccessor): ICurrentUserService
{
    public Guid? UserId
    {
        get
        {
            var user = _httpContextAccessor.HttpContext?.User;
            if (user?.Identity?.IsAuthenticated != true)
                return null;

            var userIdValue = user.FindFirst(JwtRegisteredClaimNames.Sub)?.Value
                ?? user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return Guid.TryParse(userIdValue, out var userId) ? userId : null;
        }
    }

    public bool IsAuthenticated => UserId is not null;
}
