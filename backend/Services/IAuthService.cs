using PetAdopt.Models;

namespace PetAdopt.Services
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(RegisterDto request);
        Task<string?> LoginAsync(UserDto request);
        Task<ProfileDto?> GetUserAsync(String userId);
    }
}
