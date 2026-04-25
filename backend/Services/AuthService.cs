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
            if (user.account_status != Status.Approved) return null;

            if (!VerifyPasswordHash(request.Password, user.password_hash, user.salt))
                return null;

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
                    City = user.city,
                    Country = user.country
                }
            };
        }

        public async Task<AuthResponseDto?> RefreshTokenAsync(string token)
        {
            var tokenHash = HashToken(token);
            var user = await _context.Users
                .Include(u => u.RefreshTokens)
                .FirstOrDefaultAsync(u => u.RefreshTokens.Any(t => t.TokenHash == tokenHash));

            if (user == null) return null;

            var refreshToken = user.RefreshTokens.FirstOrDefault(t => t.TokenHash == tokenHash);
            if (refreshToken == null || !refreshToken.IsActive) return null;

            // Rotate token (Task 2B)
            refreshToken.Revoked = DateTime.UtcNow;
            var newRefreshToken = GenerateRefreshToken(user.id);
            user.RefreshTokens.Add(newRefreshToken);

            var accessToken = CreateToken(user);
            await _context.SaveChangesAsync();

            // Return the raw token to the user, but it's saved encrypted in DB
            return new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = _encryptionService.Decrypt(newRefreshToken.Token), 
                User = new AuthenticatedUserDto
                {
                    Id = user.id,
                    Email = user.email,
                    FirstName = user.first_name,
                    LastName = user.last_name,
                    Role = user.role.ToString(),
                    Phone = _encryptionService.Decrypt(user.phone ?? ""),
                    City = user.city,
                    Country = user.country
                }
            };
        }

        public async Task<bool> LogoutAsync(string token)
        {
            var tokenHash = HashToken(token);
            var refreshToken = await _context.RefreshTokens.FirstOrDefaultAsync(t => t.TokenHash == tokenHash);
            if (refreshToken == null) return false;

            refreshToken.Revoked = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<AuthenticatedUserDto?> RegisterAsync(RegisterDto request)
        {
            if (await _context.Users.AnyAsync(u => u.email == request.Email)) return null;

            CreatePasswordHash(request.Password, out string hash, out string salt);

            var user = new User
            {
                email = request.Email,
                first_name = request.FirstName,
                last_name = request.LastName,
                phone = _encryptionService.Encrypt(request.Phone ?? ""), // AES Encryption (Task 2E)
                city = request.City,
                country = request.Country,
                role = request.Role,
                password_hash = hash,
                salt = salt,
                created_at = DateTime.UtcNow,
                updated_at = DateTime.UtcNow
            };

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
                Id = user.id,
                Role = user.role.ToString(),
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
            var rawToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
            return new RefreshToken
            {
                Token = _encryptionService.Encrypt(rawToken), // AES Encryption
                TokenHash = HashToken(rawToken),             // Hashed for search
                Expires = DateTime.UtcNow.AddDays(7), 
                UserId = userId
            };
        }

        private string HashToken(string token)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(token));
            return Convert.ToBase64String(bytes);
        }

        private void CreatePasswordHash(string password, out string hash, out string salt)
        {
            using var hmac = new HMACSHA512();
            salt = Convert.ToBase64String(hmac.Key);
            hash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(password)));
        }

        private bool VerifyPasswordHash(string password, string storedHash, string storedSalt)
        {
            using var hmac = new HMACSHA512(Convert.FromBase64String(storedSalt));
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(computedHash) == storedHash;
        }
    }
}
