using Authentication.Models;

namespace Authentication.Services
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(RegisterDto request);
        Task<string?> LoginAsync(UserDto request);
        Task<ProfileDto?> GetUserAsync(String userId);
    }
}
