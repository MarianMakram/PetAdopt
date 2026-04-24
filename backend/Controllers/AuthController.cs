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
        public async Task<ActionResult<User>> Register(RegisterDto request)
        {
            request.Role = Role.Adopter;
            var user = await authService.RegisterAsync(request);
            if (user is null) return BadRequest("User already exists.");
            return Ok(user);
        }

        [HttpPost("register/shelter")]
        public async Task<ActionResult<User>> RegisterShelter(RegisterDto request)
        {
            request.Role = Role.Shelter;
            var user = await authService.RegisterAsync(request);
            if (user is null) return BadRequest("User already exists.");
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login(UserDto request)
        {
            var result = await authService.LoginAsync(request);
            if (result is null) return Unauthorized("Invalid login credentials or account pending approval.");

            // Set refresh token in cookie for better security (optional, but prompt says body/cookie)
            // For now, returning in body as per common React patterns if not specified
            return Ok(result);
        }

        [HttpPost("refresh")]
        public async Task<ActionResult<AuthResponseDto>> Refresh([FromBody] RefreshRequest request)
        {
            var result = await authService.RefreshTokenAsync(request.RefreshToken);
            if (result is null) return Unauthorized("Invalid refresh token.");
            return Ok(result);
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] RefreshRequest request)
        {
            await authService.LogoutAsync(request.RefreshToken);
            return Ok(new { message = "Logged out successfully" });
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<ProfileDto>> GetCurrentUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            var user = await authService.GetUserAsync(userId);
            if (user is null) return NotFound("User not found.");
            
            return Ok(user);
        }
    }

    public class RefreshRequest
    {
        public string RefreshToken { get; set; } = string.Empty;
    }
}
