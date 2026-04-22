using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetAdopt.Data;
using PetAdopt.Models;

namespace PetAdopt.Controllers
{
    [ApiController]
    [Route("api/adoption-requests")]
    public class AdoptionRequestsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdoptionRequestsController(AppDbContext context)
        {
            _context = context;
        }

        // POST /api/adoption-requests
        [HttpPost]
        public async Task<IActionResult> SubmitAdoptionRequest([FromBody] AdoptionRequestDto dto)
        {
            var pet = await _context.Pets.FindAsync(dto.PetId);
            if (pet == null) return NotFound(new { message = "Pet not found" });

            if (pet.Status != PetStatus.Approved)
            {
                return BadRequest(new { message = "Pet is not available for adoption" });
            }

            // Mock AdopterId
            int mockAdopterId = 2;

            var request = new AdoptionRequest
            {
                PetId = dto.PetId,
                AdopterId = mockAdopterId,
                Message = dto.Message,
                WhyThisPet = dto.WhyThisPet,
                Status = RequestStatus.Pending,
                RequestedAt = DateTime.UtcNow
            };

            _context.AdoptionRequests.Add(request);
            await _context.SaveChangesAsync();

            return Ok(request);
        }

        // GET /api/adoption-requests
        [HttpGet]
        public async Task<IActionResult> GetMyRequests()
        {
            // Mock AdopterId
            int mockAdopterId = 2;

            var requests = await _context.AdoptionRequests
                .Include(r => r.Pet)
                .Where(r => r.AdopterId == mockAdopterId)
                .OrderByDescending(r => r.RequestedAt)
                .ToListAsync();

            return Ok(requests);
        }
    }

    public class AdoptionRequestDto
    {
        public int PetId { get; set; }
        public string Message { get; set; }
        public string WhyThisPet { get; set; }
    }
}
