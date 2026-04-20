using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetAdopt.Models;

namespace PetAdopt.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            // Fetch pets that are waiting for admin approval (Status = PendingReview which is 1)
            var pendingPets = await _context.Pets
                .Where(p => p.Status == PetStatus.PendingReview)
                .ToListAsync();

            return Ok(pendingPets);
        }

        [HttpPost("approve-pet/{id}")]
        public async Task<IActionResult> ApprovePet(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null)
            {
                return NotFound(new { Message = "Pet not found" });
            }

            pet.Status = PetStatus.Approved;
            await _context.SaveChangesAsync();

            return Ok(new { Message = $"Pet {id} approved successfully" });
        }

        [HttpPost("reject-pet/{id}")]
        public async Task<IActionResult> RejectPet(int id, [FromBody] object rejectReason)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null)
            {
                return NotFound(new { Message = "Pet not found" });
            }

            pet.Status = PetStatus.Rejected;
            await _context.SaveChangesAsync();

            return Ok(new { Message = $"Pet {id} rejected" });
        }
    }
}
