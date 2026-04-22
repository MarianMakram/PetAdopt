using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetAdopt.Models;
using PetAdopt.Services;
using System.Security.Claims;

namespace PetAdopt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IAuthService authService) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(RegisterDto request)
        {
            var user = await authService.RegisterAsync(request);
            if (user is null)
                return BadRequest("User already exists.");

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<String>> Login(UserDto request)
        {
            var result = await authService.LoginAsync(request);
            if (result is null)
                return BadRequest("Invalid login credentials. Please try again.");

            return Ok(result);
        }

        [Authorize]
        [HttpGet]
        public IActionResult AuthenticatedOnlyEndpoint()
        {
            return Ok("You are authenticated!");
        }

        [Authorize(Roles = "admin")]
        [HttpGet("admin-only")]
        public IActionResult AdminOnlyEndpoint()
        {
            return Ok("You are an admin!");
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok("You have been logged out.");
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<ProfileDto>> GetCurrentUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await authService.GetUserAsync(userId);

            if (user is null)
            {
                return NotFound("User not found.");

            }
            
            return Ok(user);
        }
    }
}
