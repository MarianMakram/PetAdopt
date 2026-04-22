using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Authentication.Models
{
        [Table("users")]
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string Email { get; set; }

        [Column("password_hash")]
        public string PasswordHash { get; set; }

        public UserRole Role { get; set; }

        [Column("account_status")]
        public AccountStatus AccountStatus { get; set; }

        [Column("first_name")]
        public string FirstName { get; set; }

        [Column("last_name")]
        public string LastName { get; set; }

        public string? Phone { get; set; }

        public string? City { get; set; }

        public string? Country { get; set; }

        [Column("created_at")]
        public DateTime? CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime? UpdatedAt { get; set; }
    }
}
