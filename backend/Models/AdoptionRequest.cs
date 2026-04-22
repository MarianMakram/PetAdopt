using System;

namespace PetAdopt.Models
{
    public class AdoptionRequest
    {
        public int Id { get; set; }
        public int PetId { get; set; }
        public int AdopterId { get; set; }
        public string? Message { get; set; }
        public string? WhyThisPet { get; set; }
        public RequestStatus Status { get; set; }
        public string? RejectionReason { get; set; }
        public DateTime? RespondedAt { get; set; }
        public DateTime CreatedAt { get; set; }

        public Pet? Pet { get; set; }
        public User? Adopter { get; set; }
    }

    public enum RequestStatus
    {
        Pending = 0,
        Accepted = 1,
        Rejected = 2
    }
}
