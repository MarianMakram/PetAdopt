using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetAdopt.Data;
using PetAdopt.Models;
using System.Security.Claims;

namespace PetAdopt.Controllers
{
    [Authorize(Roles = "Adopter")]
    [ApiController]
    [Route("api/favorites")]
    public class FavoritesController(AppDbContext context) : ControllerBase
    {
        private int GetCurrentUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        [HttpGet]
        public async Task<IActionResult> GetFavorites()
        {
            var userId = GetCurrentUserId();
            var favorites = await context.Favorites
                .Include(f => f.Pet)
                .Where(f => f.UserId == userId)
                .OrderByDescending(f => f.CreatedAt)
                .ToListAsync();
            return Ok(favorites);
        }

        [HttpPost]
        public async Task<IActionResult> AddFavorite([FromBody] FavoriteDto dto)
        {
            var userId = GetCurrentUserId();
            var existing = await context.Favorites.FirstOrDefaultAsync(f => f.PetId == dto.PetId && f.UserId == userId);
            if (existing != null) return BadRequest("Already in favorites");

            var favorite = new Favorite { PetId = dto.PetId, UserId = userId, CreatedAt = DateTime.UtcNow };
            context.Favorites.Add(favorite);
            await context.SaveChangesAsync();
            return Ok(favorite);
        }

        [HttpDelete("{petId}")]
        public async Task<IActionResult> RemoveFavorite(int petId)
        {
            var userId = GetCurrentUserId();
            var favorite = await context.Favorites.FirstOrDefaultAsync(f => f.PetId == petId && f.UserId == userId);
            if (favorite == null) return NotFound();

            context.Favorites.Remove(favorite);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }

    public class FavoriteDto { public int PetId { get; set; } }
}
