using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetAdopt.Data;
using PetAdopt.Models;

namespace PetAdopt.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PetController(AppDbContext context)
        {
            _context = context;
        }

        // GET /api/pet  (public - returns only Approved pets with optional filters)
        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] string? species,
            [FromQuery] string? breed,
            [FromQuery] string? gender,
            [FromQuery] int? minAge,
            [FromQuery] int? maxAge,
            [FromQuery] string? location,
            [FromQuery] string? search,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 12)
        {
            var query = _context.Pets.AsQueryable();

            // Only show approved pets for public browsing
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

            // Filter by gender
            if (!string.IsNullOrEmpty(gender) && Enum.TryParse<Gender>(gender, true, out var genderEnum))
            {
                query = query.Where(p => p.Gender == genderEnum);
            }

           

            // Filter by location
            if (!string.IsNullOrEmpty(location))
            {
            }

            // Search by name or description
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(p =>
                    (p.Name != null && p.Name.ToLower().Contains(search.ToLower())) ||
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

        // GET /api/pet/{id}  (public - returns pet details)
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null) return NotFound(new { message = "Pet not found" });
            return Ok(pet);
        }

        // POST /api/pet  (owner - create a pet)
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Pet pet)
        {
            pet.Status = PetStatus.Draft;
            _context.Pets.Add(pet);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = pet.Id }, pet);
        }

        // PUT /api/pet/{id}  (owner - update a pet)
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Pet updatedPet)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null) return NotFound();

            pet.Name = updatedPet.Name;
            pet.Species = updatedPet.Species;
            pet.Breed = updatedPet.Breed;
            pet.Gender = updatedPet.Gender;
            pet.ImageUrls = updatedPet.ImageUrls;

            await _context.SaveChangesAsync();
            return Ok(pet);
        }

        // PATCH /api/pet/{id}/status  (admin - approve/reject a pet)
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusRequest request)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null) return NotFound();

            if (Enum.TryParse<PetStatus>(request.Status, true, out var status))
            {
                pet.Status = status;
                await _context.SaveChangesAsync();
                return Ok(pet);
            }

            return BadRequest(new { message = "Invalid status" });
        }

        // DELETE /api/pet/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null) return NotFound();
            _context.Pets.Remove(pet);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

    public class UpdateStatusRequest
    {
        public string Status { get; set; } = "";
    }
}   