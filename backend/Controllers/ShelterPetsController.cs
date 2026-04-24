using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetAdopt.Data;
using PetAdopt.Models;
using System.Security.Claims;

namespace PetAdopt.Controllers
{
    [Authorize(Roles = "Shelter")]
    [ApiController]
    [Route("api/shelter/pets")]
    public class ShelterPetsController(AppDbContext context) : ControllerBase
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
            context.Pets.Add(pet);
            await context.SaveChangesAsync();
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
            existingPet.Species = pet.Species;
            existingPet.Breed = pet.Breed;
            existingPet.Age = pet.Age;
            existingPet.Location = pet.Location;
            existingPet.ImageUrls = pet.ImageUrls;
            
            await context.SaveChangesAsync();
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
