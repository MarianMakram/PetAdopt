using System.ComponentModel.DataAnnotations;

namespace PetAdopt.Models
{
    public class Notification
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public User? user { get; set; }
        public string title { get; set; } = string.Empty;
        public string message { get; set; } = string.Empty;
        public string type { get; set; } = "Info"; // Info, Success, Warning, Error
        public bool is_read { get; set; } = false;
        public DateTime created_at { get; set; } = DateTime.UtcNow;
        public string? related_entity_id { get; set; }
        public string? related_entity_type { get; set; }
    }
}
