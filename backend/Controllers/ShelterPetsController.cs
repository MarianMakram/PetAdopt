using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetAdopt.Data;
using PetAdopt.Models;
using PetAdopt.Services;
using System.Security.Claims;

namespace PetAdopt.Controllers
{
    [Authorize(Roles = "Shelter")]
    [ApiController]
    [Route("api/shelter/pets")]
    public class ShelterPetsController(AppDbContext context, INotificationService notificationService) : ControllerBase
    {
        private int GetCurrentUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        [HttpGet]
        public async Task<IActionResult> GetMyPets()
        {
            var userId = GetCurrentUserId();
            var pets = await context.Pets.Where(p => p.OwnerId == userId).ToListAsync();
            return Ok(pets);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePet(Pet pet)
        {
            pet.OwnerId = GetCurrentUserId();
            pet.Status = PetStatus.PendingReview; // Task 2D
            pet.CreatedAt = DateTime.UtcNow;
            context.Pets.Add(pet);
            await context.SaveChangesAsync();

            // Notify Admins
            var admins = await context.Users.Where(u => u.role == Role.Admin).ToListAsync();
            foreach (var admin in admins)
            {
                await notificationService.SendNotificationAsync(
                    admin.id,
                    "New Pet Post",
                    $"A new pet '{pet.Name}' has been posted and needs approval.",
                    "Warning",
                    pet.Id.ToString(),
                    "Pet"
                );
            }

            return CreatedAtAction(nameof(GetMyPets), new { id = pet.Id }, pet);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePet(int id, Pet pet)
        {
            var existingPet = await context.Pets.FindAsync(id);
            if (existingPet == null) return NotFound();
            if (existingPet.OwnerId != GetCurrentUserId()) return Forbid(); // Cross-tenant isolation (Task 2C)

            existingPet.Name = pet.Name;
            existingPet.Description = pet.Description;
            existingPet.HealthStatus = pet.HealthStatus;
            existingPet.Species = pet.Species;
            existingPet.Breed = pet.Breed;
            existingPet.Age = pet.Age;
            existingPet.Location = pet.Location;
            existingPet.ImageUrls = pet.ImageUrls;
            
            await context.SaveChangesAsync();

            // Notify all Adopters who favorited this pet
            var favoritedBy = await context.Favorites
                .Where(f => f.PetId == id)
                .Select(f => f.UserId)
                .ToListAsync();

            foreach (var adopterId in favoritedBy)
            {
                await notificationService.SendNotificationAsync(
                    adopterId,
                    "Favorite Pet Updated",
                    $"The details for {existingPet.Name} have been updated.",
                    "Info",
                    existingPet.Id.ToString(),
                    "Pet"
                );
            }

            return Ok(existingPet);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePet(int id)
        {
            var pet = await context.Pets.FindAsync(id);
            if (pet == null) return NotFound();
            if (pet.OwnerId != GetCurrentUserId()) return Forbid();

            context.Pets.Remove(pet);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
