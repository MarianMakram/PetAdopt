using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetAdopt.Data;
using PetAdopt.Models;

namespace PetAdopt.Controllers
{
    [ApiController]
    [Route("api/shelter/requests")]
    public class ShelterRequestsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ShelterRequestsController(AppDbContext context)
        {
            _context = context;
        }

        // GET /api/shelter/requests
        [HttpGet]
        public async Task<IActionResult> GetRequests([FromQuery] int shelterId)
        {
            // In a real app, shelterId would come from the JWT token.
            // For now, we accept it as a query param or just return all for demo purposes if not provided.
            var query = _context.AdoptionRequests
                .Include(r => r.Pet)
                .Include(r => r.Adopter)
                .AsQueryable();

            if (shelterId > 0)
            {
                query = query.Where(r => r.Pet != null && r.Pet.OwnerId == shelterId);
            }

            var requests = await query.ToListAsync();
            return Ok(requests);
        }

        // PATCH /api/shelter/requests/{id}/accept
        [HttpPatch("{id}/accept")]
        public async Task<IActionResult> AcceptRequest(int id)
        {
            var request = await _context.AdoptionRequests
                .Include(r => r.Pet)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (request == null) return NotFound(new { message = "Request not found" });

            if (request.Status != RequestStatus.Pending)
            {
                return BadRequest(new { message = "Request is not in pending state" });
            }

            request.Status = RequestStatus.Accepted;
            request.RespondedAt = DateTime.UtcNow;

            if (request.Pet != null)
            {
                request.Pet.Status = PetStatus.Adopted;
            }

            // Reject all other pending requests for this pet
            var otherRequests = await _context.AdoptionRequests
                .Where(r => r.PetId == request.PetId && r.Id != id && r.Status == RequestStatus.Pending)
                .ToListAsync();

            foreach (var req in otherRequests)
            {
                req.Status = RequestStatus.Rejected;
                req.RejectionReason = "Pet adopted by someone else.";
                req.RespondedAt = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();

            // Here we would emit SignalR event: adoption:request_status_changed

            return Ok(request);
        }

        // PATCH /api/shelter/requests/{id}/reject
        [HttpPatch("{id}/reject")]
        public async Task<IActionResult> RejectRequest(int id, [FromBody] RejectRequestDto dto)
        {
            var request = await _context.AdoptionRequests.FindAsync(id);

            if (request == null) return NotFound(new { message = "Request not found" });

            if (request.Status != RequestStatus.Pending)
            {
                return BadRequest(new { message = "Request is not in pending state" });
            }

            request.Status = RequestStatus.Rejected;
            request.RejectionReason = dto.Reason;
            request.RespondedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            // Here we would emit SignalR event: adoption:request_status_changed

            return Ok(request);
        }
    }

    public class RejectRequestDto
    {
        public string? Reason { get; set; }
    }
}
