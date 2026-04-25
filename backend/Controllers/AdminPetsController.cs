using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetAdopt.Data;
using PetAdopt.Models;
using PetAdopt.Services;

namespace PetAdopt.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/admin/pets")]
    public class AdminPetsController(AppDbContext context, INotificationService notificationService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetDefaultPending()
        {
            return await GetPetsByStatus("PendingReview");
        }

        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetPetsByStatus(string status)
        {
            if (!Enum.TryParse<PetStatus>(status, true, out var statusEnum))
                return BadRequest("Invalid status");

            var pets = await context.Pets
                .Where(p => p.Status == statusEnum)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
            return Ok(pets);
        }

        [HttpPatch("{id}/approve")]
        public async Task<IActionResult> ApprovePet(int id)
        {
            var pet = await context.Pets.FindAsync(id);
            if (pet == null) return NotFound();
            pet.Status = PetStatus.Approved;
            await context.SaveChangesAsync();

            // Notify Owner
            await notificationService.SendNotificationAsync(
                pet.OwnerId,
                "Pet Approved!",
                $"Your pet listing for {pet.Name} has been approved and is now public.",
                "Success",
                pet.Id.ToString(),
                "Pet"
            );

            return Ok(new { message = "Pet approved" });
        }

        [HttpPatch("{id}/reject")]
        public async Task<IActionResult> RejectPet(int id)
        {
            var pet = await context.Pets.FindAsync(id);
            if (pet == null) return NotFound();
            pet.Status = PetStatus.Rejected;
            await context.SaveChangesAsync();

            // Notify Owner
            await notificationService.SendNotificationAsync(
                pet.OwnerId,
                "Pet Rejected",
                $"Unfortunately, your pet listing for {pet.Name} was not approved.",
                "Error",
                pet.Id.ToString(),
                "Pet"
            );

            return Ok(new { message = "Pet rejected" });
        }
    }
}
