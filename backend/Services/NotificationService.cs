using Microsoft.AspNetCore.SignalR;
using PetAdopt.Hubs;
using PetAdopt.Models;
using PetAdopt.Repositories;

namespace PetAdopt.Services
{
    public interface INotificationService
    {
        Task SendNotificationAsync(int userId, string title, string message, string type = "Info", string? relatedId = null, string? relatedType = null);
    }

    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _repository;
        private readonly IHubContext<NotificationHub> _hubContext;

        public NotificationService(INotificationRepository repository, IHubContext<NotificationHub> hubContext)
        {
            _repository = repository;
            _hubContext = hubContext;
        }

        public async Task SendNotificationAsync(int userId, string title, string message, string type = "Info", string? relatedId = null, string? relatedType = null)
        {
            // 1. Save to DB
            var notification = new Notification
            {
                user_id = userId,
                title = title,
                message = message,
                type = type,
                is_read = false,
                created_at = DateTime.UtcNow,
                related_entity_id = relatedId,
                related_entity_type = relatedType
            };

            await _repository.AddAsync(notification);
            await _repository.SaveChangesAsync();

            // 2. Send real-time (SignalR)
            await _hubContext.Clients.User(userId.ToString()).SendAsync("ReceiveNotification", notification);
        }
    }
}