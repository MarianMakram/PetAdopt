using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetAdopt.Models
{
    [Table("adoption_request")]
    public class AdoptionRequest
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("pet_id")]
        public int PetId { get; set; }

        [Column("adopter_id")]
        public int AdopterId { get; set; }

        [Column("owner_id")]
        public int OwnerId { get; set; }

        [Column("message")]
        public string? Message { get; set; }

        [Column("status")]
        public RequestStatus Status { get; set; }

        [Column("rejection_reason")]
        public string? RejectionReason { get; set; }

        [Column("requested_at")]
        public DateTime CreatedAt { get; set; }

        [Column("responded_at")]
        public DateTime? RespondedAt { get; set; }

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
