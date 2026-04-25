using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetAdopt.Data;
using PetAdopt.Models;

namespace PetAdopt.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/admin/users")]
    public class AdminUsersController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetDefaultPending()
        {
            return await GetUsersByStatus("Pending");
        }

        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetUsersByStatus(string status)
        {
            if (!Enum.TryParse<Status>(status, true, out var statusEnum))
                return BadRequest("Invalid status");

            var users = await context.Users
                .Where(u => u.account_status == statusEnum)
                .OrderByDescending(u => u.created_at)
                .ToListAsync();
            return Ok(users);
        }

        [HttpPatch("{id}/approve")]
        public async Task<IActionResult> ApproveUser(int id)
        {
            var user = await context.Users.FindAsync(id);
            if (user == null) return NotFound();
            user.account_status = Status.Approved;
            await context.SaveChangesAsync();
            return Ok(new { message = "User approved" });
        }

        [HttpPatch("{id}/reject")]
        public async Task<IActionResult> RejectUser(int id)
        {
            var user = await context.Users.FindAsync(id);
            if (user == null) return NotFound();
            user.account_status = Status.Rejected;
            await context.SaveChangesAsync();
            return Ok(new { message = "User rejected" });
        }

        [HttpPatch("{id}/suspend")]
        public async Task<IActionResult> SuspendUser(int id)
        {
            var user = await context.Users.FindAsync(id);
            if (user == null) return NotFound();
            user.account_status = Status.Suspended;
            await context.SaveChangesAsync();
            return Ok(new { message = "User suspended" });
        }
    }
}
