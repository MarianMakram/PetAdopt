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


        // GET /api/pet?status=all  (owner - list all pets)
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string status = "approved")
        {
            var query = _context.Pets.AsQueryable();
            if (status != "all")
            {
                if (Enum.TryParse<PetStatus>(status, true, out var petStatus))
                {
                    query = query.Where(p => p.Status == petStatus);
                }
                else
                {
                    query = query.Where(p => p.Status == PetStatus.Approved);
                }
            }
            var pets = await query.ToListAsync();
            return Ok(pets);
        }

        // GET /api/pet/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null) return NotFound();
            return Ok(pet);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Pet pet)
        {
            pet.Status = PetStatus.PendingReview;
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