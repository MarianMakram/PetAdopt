using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetAdopt.Data;
using PetAdopt.Models;
using System.Security.Claims;

namespace PetAdopt.Controllers
{
    [ApiController]
    [Route("api/reviews")]
    public class ReviewsController(AppDbContext context) : ControllerBase
    {
        private int GetCurrentUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        [HttpGet("pet/{petId}")]
        public async Task<IActionResult> GetPetReviews(int petId)
        {
            var reviews = await context.Reviews
                .Include(r => r.Adopter)
                .Where(r => r.PetId == petId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
            foreach (var r in reviews)
                r.CreatedAt = DateTime.SpecifyKind(r.CreatedAt, DateTimeKind.Utc);
            return Ok(reviews);
        }
        
        [Authorize(Roles = "Shelter")]
        [HttpGet("shelter")]
        public async Task<IActionResult> GetShelterReviews()
        {
            var userId = GetCurrentUserId();
            var reviews = await context.Reviews
                .Include(r => r.Adopter)
                .Include(r => r.Pet)
                .Where(r => r.Pet!.OwnerId == userId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
            foreach (var r in reviews)
                r.CreatedAt = DateTime.SpecifyKind(r.CreatedAt, DateTimeKind.Utc);
            return Ok(reviews);
        }

        [Authorize(Roles = "Adopter")]
        [HttpPost]
        public async Task<IActionResult> AddReview([FromBody] ReviewDto dto)
        {
            var userId = GetCurrentUserId();
            
            // Check if user adopted the pet (Requirement: only after accepted adoption)
            var adoption = await context.AdoptionRequests
                .AnyAsync(r => r.PetId == dto.PetId && r.AdopterId == userId && r.Status == RequestStatus.Accepted);
            
            if (!adoption)
                return BadRequest("You can only review pets you have successfully adopted.");

            var review = new Review
            {
                PetId = dto.PetId,
                AdopterId = userId,
                Rating = dto.Rating,
                Comment = dto.Comment,
                CreatedAt = DateTime.UtcNow
            };

            context.Reviews.Add(review);
            await context.SaveChangesAsync();

            var createdReview = await context.Reviews
                .Include(r => r.Adopter)
                .FirstAsync(r => r.Id == review.Id);
                
            review.CreatedAt = DateTime.SpecifyKind(review.CreatedAt, DateTimeKind.Utc);
            return Ok(createdReview);
        }
    }

    public class ReviewDto
    {
        public int PetId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
    }
}
