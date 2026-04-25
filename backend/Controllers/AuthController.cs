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
        public async Task<ActionResult<AuthenticatedUserDto>> Register(RegisterDto request)
        {
            request.Role = Role.Adopter;
            var user = await authService.RegisterAsync(request);
            if (user is null) return BadRequest("User already exists.");
            return Ok(user);
        }

        [HttpPost("register/shelter")]
        public async Task<ActionResult<AuthenticatedUserDto>> RegisterShelter(RegisterDto request)
        {
            request.Role = Role.Shelter;
            var user = await authService.RegisterAsync(request);
            if (user is null) return BadRequest("User already exists.");
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login(UserDto request)
        {
            Console.WriteLine($"[LOGIN ATTEMPT] Email: {request.Email}");
            try 
            {
                var result = await authService.LoginAsync(request);
                return Ok(result);
            }
            catch (Exception ex) when (ex.Message == "ACCOUNT_PENDING")
            {
                return BadRequest("Your account is pending admin approval. This usually takes 24-48 hours.");
            }
            catch (Exception ex) when (ex.Message == "ACCOUNT_DISABLED")
            {
                return BadRequest("Your account has been suspended or rejected. Please contact support.");
            }
            catch (Exception ex) when (ex.Message == "INVALID_CREDENTIALS")
            {
                return Unauthorized("Invalid email or password.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An internal error occurred: {ex.Message}");
            }
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
