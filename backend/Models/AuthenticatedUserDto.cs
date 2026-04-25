using System.Text.Json.Serialization;

namespace PetAdopt.Models
{
    public class AuthenticatedUserDto
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; } = string.Empty;
        
        [JsonPropertyName("first_name")]
        public string FirstName { get; set; } = string.Empty;
        
        [JsonPropertyName("last_name")]
        public string LastName { get; set; } = string.Empty;
        
        [JsonPropertyName("role")]
        public string Role { get; set; } = string.Empty;

        [JsonPropertyName("phone")]
        public string Phone { get; set; } = string.Empty;

        [JsonPropertyName("city")]
        public string City { get; set; } = string.Empty;

        [JsonPropertyName("country")]
        public string Country { get; set; } = string.Empty;
    }
}
