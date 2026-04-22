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
    public class AuthService(AppDbContext context, IConfiguration configuration) : IAuthService
    {
        public async Task<String?> LoginAsync(UserDto request)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.email == request.Email);
            if (user is null)
            {
                return null;
            }
            if (user.account_status != Status.Approved)
            {
                return null;
            }
            if (new PasswordHasher<User>().VerifyHashedPassword(user, user.password_hash, request.Password)
                == PasswordVerificationResult.Failed)
            {
                return null;
            }
            if (user.role != request.Role)
            {
                return null;
            }

            String token = CreateToken(user);
            return token;
        }

        public async Task<User?> RegisterAsync(RegisterDto request)
        {
            if (await context.Users.AnyAsync(u => u.email == request.Email))
            {
                return null;
            }

            var user = new User();
            var hashedPassword = new PasswordHasher<User>()
                .HashPassword(user, request.Password);
            user.email = request.Email;
            user.password_hash = hashedPassword;
            user.first_name = request.FirstName;
            user.last_name = request.LastName;
            user.phone = request.Phone;
            user.city = request.City;
            user.country = request.Country;
            user.role = request.Role;
            
            if (user.role == Role.Shelter)
            {
                user.account_status = Status.Pending;
            } else
            {
                user.account_status = Status.Approved;
            }
            
            user.created_at = DateTime.UtcNow;
            user.updated_at = DateTime.UtcNow;

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return user;
        }

        public async Task<ProfileDto?> GetUserAsync(String userId)
        {
            if (string.IsNullOrEmpty(userId))
                return null;

            if (!int.TryParse(userId, out int id))
                return null;

            var user = await context.Users.FindAsync(id);

            if (user is null)
                return null;

            return new ProfileDto
            {
                FirstName = user.first_name,
                LastName = user.last_name,
                Email = user.email,
                Phone = user.phone,
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

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(configuration.GetValue<string>("AppSettings:Token")!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: configuration.GetValue<string>("AppSettings:Issuer"),
                audience: configuration.GetValue<string>("AppSettings:Audience"),
                claims: claims,
                expires: DateTime.UtcNow.AddDays(30),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}
