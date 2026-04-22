using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetAdopt.Models;
using PetAdopt.Data;

namespace PetAdopt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminUsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminUsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("pending-pets")]
        public async Task<IActionResult> GetPendingPets()
        {
            var pendingPets = await _context.Pets
                .Where(p => p.Status == PetStatus.PendingReview)
                .ToListAsync();
            return Ok(pendingPets);
        }

        [HttpPost("approve-pet/{id}")]
        public async Task<IActionResult> ApprovePet(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null) return NotFound(new { message = "Pet not found" });
            pet.Status = PetStatus.Approved;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Pet approved" });
        }

        [HttpPost("reject-pet/{id}")]
        public async Task<IActionResult> RejectPet(int id, [FromBody] RejectRequest request)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null) return NotFound(new { message = "Pet not found" });
            pet.Status = PetStatus.Rejected;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Pet rejected", reason = request.Reason });
        }

        [HttpGet("pending-user")]
        public async Task<IActionResult> GetPendingUsers()
        {
            var pendingUsers = await _context.Users
                                .Where(u => u.account_status == Status.Pending)
                                .ToListAsync();
            return Ok(pendingUsers);
        }

        [HttpPatch("approve-user/{id}")]
        public async Task<IActionResult> ApproveUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound(new { message = "User not found" });
            user.account_status = Status.Approved;
            await _context.SaveChangesAsync();
            return Ok(new { message = "User approved" });
        }

        [HttpPatch("reject-user/{id}")]
        public async Task<IActionResult> RejectUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound(new { message = "User not found" });
            user.account_status = Status.Rejected;
            await _context.SaveChangesAsync();
            return Ok(new { message = "User rejected" });
        }
        [HttpGet("users")]
        public async Task<ActionResult<List<User>>> GetAll(){
            return Ok(await _context.Users.ToListAsync());
        }
        public class RejectRequest
        {
            public string Reason { get; set; } = "";
        }
    }
}
