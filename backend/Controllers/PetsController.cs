using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetAdopt.Data;
using PetAdopt.Models;

namespace PetAdopt.Controllers
{
    [ApiController]
    [Route("api/pets")]
    public class PetsController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] string? species,
            [FromQuery] string? breed,
            [FromQuery] int? ageMin,
            [FromQuery] int? ageMax,
            [FromQuery] string? location,
            [FromQuery] int? pageSize)
        {
            var query = context.Pets.Where(p => p.Status == PetStatus.Approved).AsQueryable();

            if (!string.IsNullOrEmpty(species) && Enum.TryParse<Species>(species, true, out var speciesEnum))
                query = query.Where(p => p.Species == speciesEnum);

            if (!string.IsNullOrEmpty(breed))
                query = query.Where(p => p.Breed != null && p.Breed.Contains(breed));

            if (ageMin.HasValue)
            {
                // If ageMin is 0, we include 0 (inclusive). For other ranges (2, 5, 10), it's "Greater than" (exclusive).
                if (ageMin.Value == 0)
                    query = query.Where(p => (p.AgeUnit == 1 && p.Age >= 0) || (p.AgeUnit == 0 && p.Age >= 0));
                else
                    query = query.Where(p => (p.AgeUnit == 1 && p.Age > ageMin.Value) || (p.AgeUnit == 0 && p.Age > ageMin.Value * 12));
            }
            if (ageMax.HasValue)
            {
                // ageMax is always "up to and including" (inclusive).
                query = query.Where(p => (p.AgeUnit == 1 && p.Age <= ageMax.Value) || (p.AgeUnit == 0 && p.Age <= ageMax.Value * 12));
            }
            
            if (!string.IsNullOrEmpty(location))
                query = query.Where(p => p.Location != null && p.Location.Contains(location));
                
            if (pageSize.HasValue)
                query = query.Take(pageSize.Value);
                
            return Ok(await query.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var pet = await context.Pets.FindAsync(id);
            if (pet == null) return NotFound();
            return Ok(pet);
        }
    }
}
