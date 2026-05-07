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

            if (ageMin.HasValue) query = query.Where(p => p.Age >= ageMin.Value);
            if (ageMax.HasValue) query = query.Where(p => p.Age <= ageMax.Value);
            
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
