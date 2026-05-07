namespace PetAdopt.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int PetId { get; set; }
        public int AdopterId { get; set; }
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public Pet? Pet { get; set; }
        public User? Adopter { get; set; }
    }
}
