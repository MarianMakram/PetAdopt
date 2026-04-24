using PetAdopt.Models;

namespace PetAdopt.Services
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(RegisterDto request);
        Task<AuthResponseDto?> LoginAsync(UserDto request);
        Task<AuthResponseDto?> RefreshTokenAsync(string refreshToken);
        Task<bool> LogoutAsync(string refreshToken);
        Task<ProfileDto?> GetUserAsync(string userId);
    }

    public class AuthResponseDto
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public User User { get; set; } = null!;
    }
}
