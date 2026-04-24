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
    [Route("api/adoption-requests")]
    public class AdoptionRequestsController(AppDbContext context) : ControllerBase
    {
        private int GetCurrentUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        [HttpPost]
        public async Task<IActionResult> SubmitAdoptionRequest([FromBody] AdoptionRequestDto dto)
        {
            var pet = await context.Pets.FindAsync(dto.PetId);
            if (pet == null) return NotFound(new { message = "Pet not found" });

            if (pet.Status != PetStatus.Approved)
                return BadRequest(new { message = "Pet is not available for adoption" });

            var request = new AdoptionRequest
            {
                PetId = dto.PetId,
                AdopterId = GetCurrentUserId(),
                Message = dto.Message,
                WhyThisPet = dto.WhyThisPet,
                Status = RequestStatus.Pending,
                RequestedAt = DateTime.UtcNow
            };

            context.AdoptionRequests.Add(request);
            await context.SaveChangesAsync();

            return Ok(request);
        }

        [HttpGet]
        public async Task<IActionResult> GetMyRequests()
        {
            var userId = GetCurrentUserId();
            var requests = await context.AdoptionRequests
                .Include(r => r.Pet)
                .Where(r => r.AdopterId == userId)
                .OrderByDescending(r => r.RequestedAt)
                .ToListAsync();

            return Ok(requests);
        }
    }

    public class AdoptionRequestDto
    {
        public int PetId { get; set; }
        public string Message { get; set; } = string.Empty;
        public string WhyThisPet { get; set; } = string.Empty;
    }
}
