using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetAdopt.Data;
using PetAdopt.Models;

namespace PetAdopt.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavoritesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FavoritesController(AppDbContext context)
        {
            _context = context;
        }

        // GET /api/favorites
        [HttpGet]
        public async Task<IActionResult> GetFavorites()
        {
            // Mock AdopterId
            int mockUserId = 2;

            var favorites = await _context.Favorites
                .Include(f => f.Pet)
                .Where(f => f.UserId == mockUserId)
                .OrderByDescending(f => f.CreatedAt)
                .ToListAsync();

            return Ok(favorites);
        }

        // POST /api/favorites
        [HttpPost]
        public async Task<IActionResult> AddFavorite([FromBody] FavoriteDto dto)
        {
            var pet = await _context.Pets.FindAsync(dto.PetId);
            if (pet == null) return NotFound(new { message = "Pet not found" });

            int mockUserId = 2;

            var existing = await _context.Favorites
                .FirstOrDefaultAsync(f => f.PetId == dto.PetId && f.UserId == mockUserId);
            
            if (existing != null)
            {
                return BadRequest(new { message = "Pet already in favorites" });
            }

            var favorite = new Favorite
            {
                PetId = dto.PetId,
                UserId = mockUserId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Favorites.Add(favorite);
            await _context.SaveChangesAsync();

            return Ok(favorite);
        }

        // DELETE /api/favorites/{petId}
        [HttpDelete("{petId}")]
        public async Task<IActionResult> RemoveFavorite(int petId)
        {
            int mockUserId = 2;

            var favorite = await _context.Favorites
                .FirstOrDefaultAsync(f => f.PetId == petId && f.UserId == mockUserId);

            if (favorite == null) return NotFound(new { message = "Favorite not found" });

            _context.Favorites.Remove(favorite);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    public class FavoriteDto
    {
        public int PetId { get; set; }
    }
}
