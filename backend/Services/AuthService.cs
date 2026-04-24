using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using PetAdopt.Data;
using PetAdopt.Models;

namespace PetAdopt.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly EncryptionService _encryptionService;

        public AuthService(AppDbContext context, IConfiguration configuration, EncryptionService encryptionService)
        {
            _context = context;
            _configuration = configuration;
            _encryptionService = encryptionService;
        }

        public async Task<AuthResponseDto?> LoginAsync(UserDto request)
        {
            var user = await _context.Users
                .Include(u => u.RefreshTokens)
                .FirstOrDefaultAsync(u => u.email == request.Email);

            if (user is null) return null;

            // Check account status (Task 2D)
            if (user.account_status != Status.Approved)
            {
                // In a real app, you might return specific error for Pending/Rejected/Suspended
                return null;
            }

            var result = new PasswordHasher<User>().VerifyHashedPassword(user, user.password_hash, request.Password);
            if (result == PasswordVerificationResult.Failed) return null;

            var accessToken = CreateToken(user);
            var refreshToken = GenerateRefreshToken(user.id);
            
            user.RefreshTokens.Add(refreshToken);
            await _context.SaveChangesAsync();

            return new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token,
                User = user
            };
        }

        public async Task<AuthResponseDto?> RefreshTokenAsync(string token)
        {
            var user = await _context.Users
                .Include(u => u.RefreshTokens)
                .FirstOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));

            if (user == null) return null;

            var refreshToken = user.RefreshTokens.FirstOrDefault(t => t.Token == token);
            if (refreshToken == null || !refreshToken.IsActive) return null;

            // Rotate token (Task 2B)
            refreshToken.Revoked = DateTime.UtcNow;
            var newRefreshToken = GenerateRefreshToken(user.id);
            user.RefreshTokens.Add(newRefreshToken);

            var accessToken = CreateToken(user);
            await _context.SaveChangesAsync();

            return new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = newRefreshToken.Token,
                User = user
            };
        }

        public async Task<bool> LogoutAsync(string token)
        {
            var refreshToken = await _context.RefreshTokens.FirstOrDefaultAsync(t => t.Token == token);
            if (refreshToken == null) return false;

            refreshToken.Revoked = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<User?> RegisterAsync(RegisterDto request)
        {
            if (await _context.Users.AnyAsync(u => u.email == request.Email)) return null;

            var user = new User
            {
                email = request.Email,
                first_name = request.FirstName,
                last_name = request.LastName,
                phone = _encryptionService.Encrypt(request.Phone ?? ""), // AES Encryption (Task 2E)
                city = request.City,
                country = request.Country,
                role = request.Role,
                created_at = DateTime.UtcNow,
                updated_at = DateTime.UtcNow
            };

            user.password_hash = new PasswordHasher<User>().HashPassword(user, request.Password);

            // User Permissions Management (Task 2D)
            if (user.role == Role.Shelter)
            {
                user.account_status = Status.Pending;
            }
            else
            {
                user.account_status = Status.Approved;
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<ProfileDto?> GetUserAsync(string userId)
        {
            if (!int.TryParse(userId, out int id)) return null;

            var user = await _context.Users.FindAsync(id);
            if (user is null) return null;

            return new ProfileDto
            {
                FirstName = user.first_name,
                LastName = user.last_name,
                Email = user.email,
                Phone = _encryptionService.Decrypt(user.phone ?? ""), // AES Decryption
                City = user.city,
                Country = user.country
            };
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.email),
                new Claim(ClaimTypes.NameIdentifier, user.id.ToString()),
                new Claim(ClaimTypes.Role, user.role.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AppSettings:Token"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: _configuration["AppSettings:Issuer"],
                audience: _configuration["AppSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(30), // Short-lived (Task 2B)
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }

        private RefreshToken GenerateRefreshToken(int userId)
        {
            return new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.UtcNow.AddDays(7), // 7-30 days (Task 2B)
                UserId = userId
            };
        }
    }
}
