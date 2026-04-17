using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        // Get 
        [HttpGet]
        public async Task<ActionResult<List<Pet>>> GetAll()
        {
            return Ok(await _context.Pets.ToListAsync());
        }

        // Get Pet By Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            return pet == null ? NotFound() : Ok(pet);
        }

        // Add 
        [HttpPost]
        public async Task<ActionResult<Pet>> Add(Pet newPet)
        {
            if (newPet == null)
                return BadRequest();

            _context.Pets.Add(newPet);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = newPet.Id }, newPet);
        }

        // Update 
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Pet updatedPet)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null)
                return NotFound();

            pet.Name = updatedPet.Name;
            pet.Breed = updatedPet.Breed;
            pet.Age = updatedPet.Age;
            pet.AgeUnit = updatedPet.AgeUnit;
            pet.Species = updatedPet.Species;
            pet.Gender = updatedPet.Gender;
            pet.Status = updatedPet.Status;
            pet.ImageUrls = updatedPet.ImageUrls;
            pet.OwnerId = updatedPet.OwnerId;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Delete 
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null)
                return NotFound();

            _context.Pets.Remove(pet);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}