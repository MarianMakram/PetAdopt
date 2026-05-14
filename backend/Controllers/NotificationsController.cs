using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetAdopt.Models;
using PetAdopt.Repositories;
using System.Security.Claims;

namespace PetAdopt.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationRepository _repository;

        public NotificationsController(INotificationRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotifications()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var notifications = await _repository.GetUserNotificationsAsync(userId, 50);

            return Ok(notifications);
        }

        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var notification = await _repository.GetByIdAsync(id);

            if (notification == null) return NotFound();
            if (notification.user_id != userId) return Forbid();

            notification.is_read = true;
            await _repository.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("read-all")]
        public async Task<IActionResult> MarkAllAsRead()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var notifications = await _repository.GetUnreadUserNotificationsAsync(userId);

            foreach (var n in notifications)
            {
                n.is_read = true;
            }

            await _repository.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var notification = await _repository.GetByIdAsync(id);

            if (notification == null) return NotFound();
            if (notification.user_id != userId) return Forbid();

            _repository.Remove(notification);
            await _repository.SaveChangesAsync();

            return NoContent();
        }
    }
}