using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetAdopt.Models;
using PetAdopt.Services;
using System.Security.Claims;

namespace PetAdopt.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto request)
        {
            request.Role = Role.Adopter;
            var user = await authService.RegisterAsync(request);
            if (user is null) return BadRequest(new { message = "User already exists." });
            return Ok(new { data = user });
        }

        [HttpPost("register/shelter")]
        public async Task<IActionResult> RegisterShelter(RegisterDto request)
        {
            request.Role = Role.Shelter;
            var user = await authService.RegisterAsync(request);
            if (user is null) return BadRequest(new { message = "User already exists." });
            return Ok(new { data = user });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDto request)
        {
            var result = await authService.LoginAsync(request);
            if (result is null) return Unauthorized(new { message = "Invalid login credentials or account pending approval." });

            SetRefreshTokenCookie(result.RefreshToken);

            return Ok(new { 
                data = new { 
                    accessToken = result.AccessToken, 
                    user = result.User 
                } 
            });
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
                return Unauthorized(new { message = "No refresh token provided." });

            var result = await authService.RefreshTokenAsync(refreshToken);
            if (result is null) return Unauthorized(new { message = "Invalid refresh token." });

            SetRefreshTokenCookie(result.RefreshToken);

            return Ok(new { 
                data = new { 
                    accessToken = result.AccessToken, 
                    user = result.User 
                } 
            });
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (!string.IsNullOrEmpty(refreshToken))
            {
                await authService.LogoutAsync(refreshToken);
            }
            
            Response.Cookies.Delete("refreshToken");
            return Ok(new { message = "Logged out successfully" });
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            var user = await authService.GetUserAsync(userId);
            if (user is null) return NotFound(new { message = "User not found." });
            
            return Ok(new { data = user });
        }

        private void SetRefreshTokenCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true, // Set to true in production
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }
    }
}
