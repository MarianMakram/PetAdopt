using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetAdopt.Data;
using PetAdopt.Models;

namespace PetAdopt.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/admin/pets")]
    public class AdminPetsController(AppDbContext context) : ControllerBase
    {
        [HttpGet("pending")]
        public async Task<IActionResult> GetPendingPets()
        {
            var pets = await context.Pets.Where(p => p.Status == PetStatus.PendingReview).ToListAsync();
            return Ok(pets);
        }

        [HttpPatch("{id}/approve")]
        public async Task<IActionResult> ApprovePet(int id)
        {
            var pet = await context.Pets.FindAsync(id);
            if (pet == null) return NotFound();
            pet.Status = PetStatus.Approved;
            await context.SaveChangesAsync();
            return Ok(new { message = "Pet approved" });
        }

        [HttpPatch("{id}/reject")]
        public async Task<IActionResult> RejectPet(int id)
        {
            var pet = await context.Pets.FindAsync(id);
            if (pet == null) return NotFound();
            pet.Status = PetStatus.Rejected;
            await context.SaveChangesAsync();
            return Ok(new { message = "Pet rejected" });
        }
    }
}
