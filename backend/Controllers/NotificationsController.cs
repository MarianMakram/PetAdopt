using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetAdopt.Data;
using PetAdopt.Models;
using System.Security.Claims;

namespace PetAdopt.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NotificationsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotifications()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var notifications = await _context.Notifications
                .Where(n => n.user_id == userId)
                .OrderByDescending(n => n.created_at)
                .Take(50)
                .Select(n => new Notification
                {
                    id = n.id,
                    user_id = n.user_id,
                    title = n.title,
                    message = n.message,
                    type = n.type,
                    is_read = n.is_read,
                    created_at = DateTime.SpecifyKind(n.created_at, DateTimeKind.Utc),
                    related_entity_id = n.related_entity_id,
                    related_entity_type = n.related_entity_type
                })
                .ToListAsync();

            return Ok(notifications);
        }

        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var notification = await _context.Notifications.FindAsync(id);

            if (notification == null) return NotFound();
            if (notification.user_id != userId) return Forbid();

            notification.is_read = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("read-all")]
        public async Task<IActionResult> MarkAllAsRead()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var notifications = await _context.Notifications
                .Where(n => n.user_id == userId && !n.is_read)
                .ToListAsync();

            foreach (var n in notifications)
            {
                n.is_read = true;
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var notification = await _context.Notifications.FindAsync(id);

            if (notification == null) return NotFound();
            if (notification.user_id != userId) return Forbid();

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
