using Microsoft.EntityFrameworkCore;
using PetAdopt.Data;
using PetAdopt.Models;

namespace PetAdopt.Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly AppDbContext _context;

        public NotificationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Notification>> GetUserNotificationsAsync(int userId, int count = 50)
        {
            return await _context.Notifications
                .Where(n => n.user_id == userId)
                .OrderByDescending(n => n.created_at)
                .Take(count)
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
        }

        public async Task<Notification?> GetByIdAsync(int id)
        {
            return await _context.Notifications.FindAsync(id);
        }

        public async Task<IEnumerable<Notification>> GetUnreadUserNotificationsAsync(int userId)
        {
            return await _context.Notifications
                .Where(n => n.user_id == userId && !n.is_read)
                .ToListAsync();
        }

        public async Task AddAsync(Notification notification)
        {
            await _context.Notifications.AddAsync(notification);
        }

        public void Remove(Notification notification)
        {
            _context.Notifications.Remove(notification);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
