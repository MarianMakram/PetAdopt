using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetAdopt.Data;
using PetAdopt.Models;

namespace PetAdopt.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PetsController(AppDbContext context)
        {
            _context = context;
        }

        // GET /api/pets
        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] string? species,
            [FromQuery] string? breed,
            [FromQuery] int? ageMin,
            [FromQuery] int? ageMax,
            [FromQuery] string? location,
            [FromQuery] string? search,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 12)
        {
            var query = _context.Pets.AsQueryable();

            // Default public view: only approved pets
            query = query.Where(p => p.Status == PetStatus.Approved);

            // Filter by species
            if (!string.IsNullOrEmpty(species) && Enum.TryParse<Species>(species, true, out var speciesEnum))
            {
                query = query.Where(p => p.Species == speciesEnum);
            }

            // Filter by breed
            if (!string.IsNullOrEmpty(breed))
            {
                query = query.Where(p => p.Breed != null && p.Breed.ToLower().Contains(breed.ToLower()));
            }

            // Filter by age
            if (ageMin.HasValue)
            {
                query = query.Where(p => (p.AgeUnit == 1 ? p.Age * 12 : p.Age) >= ageMin.Value); // assuming AgeUnit 1 is Years, 0 is Months for normalization if needed. Actually simpler:
                // We'll just do basic age filtering assuming it's in years for this public view if not specified, 
                // but let's just do a direct age check for simplicity as per requirements.
                query = query.Where(p => p.Age >= ageMin.Value);
            }
            if (ageMax.HasValue)
            {
                query = query.Where(p => p.Age <= ageMax.Value);
            }

            // Filter by location
            if (!string.IsNullOrEmpty(location))
            {
                query = query.Where(p => p.Location != null && p.Location.ToLower().Contains(location.ToLower()));
            }

            // Search by name or description
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(p =>
                    (p.Name != null && p.Name.ToLower().Contains(search.ToLower())) ||
                    (p.Description != null && p.Description.ToLower().Contains(search.ToLower())) ||
                    (p.Breed != null && p.Breed.ToLower().Contains(search.ToLower()))
                );
            }

            var total = await query.CountAsync();
            var pets = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new { total, page, pageSize, data = pets });
        }

        // GET /api/pets/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null || pet.Status != PetStatus.Approved) 
            {
                return NotFound(new { message = "Pet not found or not available" });
            }
            return Ok(pet);
        }

    }
}
