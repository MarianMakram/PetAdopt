using PetAdopt.Models;

namespace PetAdopt.Repositories
{
    public interface INotificationRepository
    {
        Task<IEnumerable<Notification>> GetUserNotificationsAsync(int userId, int count = 50);
        Task<Notification?> GetByIdAsync(int id);
        Task<IEnumerable<Notification>> GetUnreadUserNotificationsAsync(int userId);
        Task AddAsync(Notification notification);
        void Remove(Notification notification);
        Task SaveChangesAsync();
    }
}
