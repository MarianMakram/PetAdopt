using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetAdopt.Data;
using PetAdopt.Models;

namespace PetAdopt.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReviewsController(AppDbContext context)
        {
            _context = context;
        }

        // GET /api/reviews/pet/{petId}
        [HttpGet("pet/{petId}")]
        public async Task<IActionResult> GetPetReviews(int petId)
        {
            var reviews = await _context.Reviews
                .Include(r => r.Adopter)
                .Where(r => r.PetId == petId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            return Ok(reviews);
        }

        // POST /api/reviews
        [HttpPost]
        public async Task<IActionResult> AddReview([FromBody] ReviewDto dto)
        {
            var pet = await _context.Pets.FindAsync(dto.PetId);
            if (pet == null) return NotFound(new { message = "Pet not found" });

            int mockAdopterId = 2; // For A1+A2 mocked auth

            var review = new Review
            {
                PetId = dto.PetId,
                AdopterId = mockAdopterId,
                Rating = dto.Rating,
                Comment = dto.Comment,
                CreatedAt = DateTime.UtcNow
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            // Load the adopter object so we can return it with the review
            await _context.Entry(review).Reference(r => r.Adopter).LoadAsync();

            return Ok(review);
        }
    }

    public class ReviewDto
    {
        public int PetId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
    }
}
