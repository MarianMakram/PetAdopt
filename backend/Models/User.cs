using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PetAdopt.Models
{
    public class User
    {
        public int id{ get ; set ;}
        public string email{ get ; set ;} = null!;
        
        [JsonIgnore]
        public string password_hash{ get ; set ;}= null!;
        
        [JsonIgnore]
        public string salt { get; set; } = null!;
        
        public Role role{ get ; set ;}
        public Status account_status{ get ; set ;}
        public string first_name{ get ; set ;} = null!;
        public string last_name{ get ; set ;} = null!;
        public string? phone { get ; set ;}
        public string? city { get ; set ;}
        public string? country { get ; set ;}
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }

        [JsonIgnore]
        public List<RefreshToken> RefreshTokens { get; set; } = new();
    }
}