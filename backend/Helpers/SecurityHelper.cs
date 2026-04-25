using System.Security.Cryptography;

namespace PetAdopt.Helpers
{
    public static class SecurityHelper
    {
        public static string GenerateSalt()
        {
            return Convert.ToBase64String(RandomNumberGenerator.GetBytes(16));
        }
    }
}