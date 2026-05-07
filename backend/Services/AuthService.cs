using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using PetAdopt.Data;
using PetAdopt.Models;
using PetAdopt.Helpers;

namespace PetAdopt.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly EncryptionService _encryptionService;
        private readonly INotificationService _notificationService;

        public AuthService(AppDbContext context, IConfiguration configuration, EncryptionService encryptionService, INotificationService notificationService)
        {
            _context = context;
            _configuration = configuration;
            _encryptionService = encryptionService;
            _notificationService = notificationService;
        }

        public async Task<AuthResponseDto?> LoginAsync(UserDto request)
        {
                var user = await _context.Users
                .Include(u => u.RefreshTokens)
                .FirstOrDefaultAsync(u => u.email == request.Email);

            if (user is null) throw new Exception("INVALID_CREDENTIALS");

            if (user.role == Role.Shelter)
            {
                if (user.account_status == Status.Pending)
                    throw new Exception("ACCOUNT_PENDING");

                if (user.account_status == Status.Suspended || user.account_status == Status.Rejected)
                    throw new Exception("ACCOUNT_DISABLED");
            }

          
            if (user.role == Role.Adopter && 
                (user.account_status == Status.Suspended || user.account_status == Status.Rejected))
                throw new Exception("ACCOUNT_DISABLED");

            var result = new PasswordHasher<User>().VerifyHashedPassword(user, user.password_hash, request.Password);
            if (result == PasswordVerificationResult.Failed) throw new Exception("INVALID_CREDENTIALS");

            var accessToken = CreateToken(user);
            var refreshToken = GenerateRefreshToken(user.id);
            
            user.RefreshTokens.Add(refreshToken);
            await _context.SaveChangesAsync();

            return new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token,
                User = new AuthenticatedUserDto
                {
                    Id = user.id,
                    Email = user.email,
                    FirstName = user.first_name,
                    LastName = user.last_name,
                    Role = user.role.ToString(),
                    Phone = _encryptionService.Decrypt(user.phone ?? ""),
                    City = user.city ?? string.Empty,
                    Country = user.country ?? string.Empty
                }
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

            refreshToken.Revoked = DateTime.UtcNow;
            var newRefreshToken = GenerateRefreshToken(user.id);
            user.RefreshTokens.Add(newRefreshToken);

            var accessToken = CreateToken(user);
            await _context.SaveChangesAsync();

            return new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = newRefreshToken.Token,
                User = new AuthenticatedUserDto
                {
                    Id = user.id,
                    Email = user.email,
                    FirstName = user.first_name,
                    LastName = user.last_name,
                    Role = user.role.ToString(),
                    Phone = _encryptionService.Decrypt(user.phone ?? ""),
                    City = user.city ?? string.Empty,
                    Country = user.country ?? string.Empty
                }
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

        public async Task<AuthenticatedUserDto?> RegisterAsync(RegisterDto request)
        {
            if (await _context.Users.AnyAsync(u => u.email == request.Email)) return null;

            var user = new User
            {
                email = request.Email,
                first_name = request.FirstName,
                last_name = request.LastName,
                phone = _encryptionService.Encrypt(request.Phone ?? ""), 
                city = request.City,
                country = request.Country,
                role = request.Role,
                salt = SecurityHelper.GenerateSalt(),
                created_at = DateTime.UtcNow,
                updated_at = DateTime.UtcNow
            };

            user.password_hash = new PasswordHasher<User>().HashPassword(user, request.Password);

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

            if (user.role == Role.Shelter)
            {
                var admins = await _context.Users.Where(u => u.role == Role.Admin).ToListAsync();
                foreach (var admin in admins)
                {
                    await _notificationService.SendNotificationAsync(
                        admin.id,
                        "New Shelter Registration",
                        $"A new shelter '{user.first_name} {user.last_name}' has registered and is pending approval.",
                        "Warning",
                        user.id.ToString(),
                        "User"
                    );
                }
            }

            return new AuthenticatedUserDto
            {
                Id = user.id,
                Email = user.email,
                FirstName = user.first_name,
                LastName = user.last_name,
                Role = user.role.ToString(),
                Phone = _encryptionService.Decrypt(user.phone ?? ""),
                City = user.city,
                Country = user.country
            };
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
                City = user.city ?? string.Empty,
                Country = user.country ?? string.Empty
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
