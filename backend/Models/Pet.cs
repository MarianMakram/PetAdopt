using System.ComponentModel.DataAnnotations;

namespace PetAdopt.Models
{
    public class Pet
    {
        public int Id { get; set; }

        public int OwnerId { get; set; }

        public string? Name { get; set; }

        public string? Breed { get; set; }

        public int Age { get; set; }

        public int AgeUnit { get; set; }

        public Species Species { get; set; }
        public Gender Gender { get; set; }
        public PetStatus Status { get; set; }

        public string? ImageUrls { get; set; }
    }
}
