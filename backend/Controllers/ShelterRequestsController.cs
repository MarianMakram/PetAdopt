using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetAdopt.Data;
using PetAdopt.Models;
using PetAdopt.Services;
using System.Security.Claims;

namespace PetAdopt.Controllers
{
    [Authorize(Roles = "Shelter")]
    [ApiController]
    [Route("api/shelter/requests")]
    public class ShelterRequestsController(AppDbContext context, INotificationService notificationService) : ControllerBase
    {
        private int GetCurrentUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        [HttpGet]
        public async Task<IActionResult> GetRequests()
        {
            var userId = GetCurrentUserId();
            var requests = await context.AdoptionRequests
                .Include(r => r.Pet)
                .Include(r => r.Adopter)
                .Where(r => r.Pet != null && r.Pet.OwnerId == userId)
                .ToListAsync();
            return Ok(requests);
        }

        [HttpPatch("{id}/accept")]
        public async Task<IActionResult> AcceptRequest(int id)
        {
            var request = await context.AdoptionRequests
                .Include(r => r.Pet)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (request == null) return NotFound();
            if (request.Pet?.OwnerId != GetCurrentUserId()) return Forbid();

            request.Status = RequestStatus.Accepted;
            request.RespondedAt = DateTime.UtcNow;

            if (request.Pet != null)
                request.Pet.Status = PetStatus.Adopted;

            // Reject others
            var others = await context.AdoptionRequests
                .Where(r => r.PetId == request.PetId && r.Id != id && r.Status == RequestStatus.Pending)
                .ToListAsync();
            foreach (var o in others)
            {
                o.Status = RequestStatus.Rejected;
                o.RejectionReason = "Pet adopted by someone else.";
                o.RespondedAt = DateTime.UtcNow;
            }

            await context.SaveChangesAsync();

            // Notify Accepted Adopter
            await notificationService.SendNotificationAsync(
                request.AdopterId,
                "Request Accepted!",
                $"Congratulations! Your request for {request.Pet?.Name} has been accepted.",
                "Success",
                request.Id.ToString(),
                "AdoptionRequest"
            );

            // Notify Rejected Adopters (others)
            foreach (var o in others)
            {
                await notificationService.SendNotificationAsync(
                    o.AdopterId,
                    "Pet Adopted",
                    $"The pet {request.Pet?.Name} has been adopted by someone else.",
                    "Info",
                    o.Id.ToString(),
                    "AdoptionRequest"
                );
            }

            return Ok(request);
        }

        [HttpPatch("{id}/reject")]
        public async Task<IActionResult> RejectRequest(int id, [FromBody] RejectRequestDto dto)
        {
            var request = await context.AdoptionRequests
                .Include(r => r.Pet)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (request == null) return NotFound();
            if (request.Pet?.OwnerId != GetCurrentUserId()) return Forbid();

            request.Status = RequestStatus.Rejected;
            request.RejectionReason = dto.Reason;
            request.RespondedAt = DateTime.UtcNow;

            await context.SaveChangesAsync();

            // Notify Rejected Adopter
            await notificationService.SendNotificationAsync(
                request.AdopterId,
                "Request Update",
                $"Unfortunately, your request for {request.Pet?.Name} was not accepted.",
                "Warning",
                request.Id.ToString(),
                "AdoptionRequest"
            );

            return Ok(request);
        }
    }

    public class RejectRequestDto
    {
        public string? Reason { get; set; }
    }
}
