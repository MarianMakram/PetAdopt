using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using PetAdopt.Models;
using PetAdopt.Services;

namespace PetAdopt.Data
{
    public static class DatabaseSeeder
    {
        public static void Seed(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var encryptionService = scope.ServiceProvider.GetRequiredService<EncryptionService>();
            var passwordHasher = new PasswordHasher<User>();

            // Apply migrations
            context.Database.Migrate();

            // Check for users with missing salts (old format)
            var oldUsers = context.Users.Where(u => string.IsNullOrEmpty(u.salt)).ToList();
            if (oldUsers.Any())
            {
                foreach (var user in oldUsers)
                {
                    string password = user.role switch
                    {
                        Role.Admin => "Admin@123",
                        Role.Shelter => "Shelter@123",
                        _ => "Adopter@123"
                    };
                    CreatePasswordHash(password, out string hash, out string salt);
                    user.password_hash = hash;
                    user.salt = salt;
                }
                context.SaveChanges();
            }

            // 1. Create Users (Idempotent)
            User? admin = context.Users.FirstOrDefault(u => u.email == "admin@petadopt.com");
            if (admin == null)
            {
                admin = new User
                {
                    email = "admin@petadopt.com",
                    first_name = "System",
                    last_name = "Admin",
                    phone = encryptionService.Encrypt("0100000000"),
                    city = "Cairo",
                    country = "Egypt",
                    role = Role.Admin,
                    account_status = Status.Approved,
                    created_at = DateTime.UtcNow,
                    updated_at = DateTime.UtcNow
                };
                CreatePasswordHash("Admin@123", out string hash, out string salt);
                admin.password_hash = hash;
                admin.salt = salt;
                context.Users.Add(admin);
            }

            User? shelter = context.Users.FirstOrDefault(u => u.email == "shelter@petadopt.com");
            if (shelter == null)
            {
                shelter = new User
                {
                    email = "shelter@petadopt.com",
                    first_name = "Happy",
                    last_name = "Paws Shelter",
                    phone = encryptionService.Encrypt("0111111111"),
                    city = "Cairo",
                    country = "Egypt",
                    role = Role.Shelter,
                    account_status = Status.Approved,
                    created_at = DateTime.UtcNow,
                    updated_at = DateTime.UtcNow
                };
                CreatePasswordHash("Shelter@123", out string hash, out string salt);
                shelter.password_hash = hash;
                shelter.salt = salt;
                context.Users.Add(shelter);
            }

            User? adopter = context.Users.FirstOrDefault(u => u.email == "adopter@petadopt.com");
            if (adopter == null)
            {
                adopter = new User
                {
                    email = "adopter@petadopt.com",
                    first_name = "John",
                    last_name = "Doe",
                    phone = encryptionService.Encrypt("1122334455"),
                    city = "Giza",
                    country = "Egypt",
                    role = Role.Adopter,
                    account_status = Status.Approved,
                    created_at = DateTime.UtcNow,
                    updated_at = DateTime.UtcNow
                };
                CreatePasswordHash("Adopter@123", out string hash, out string salt);
                adopter.password_hash = hash;
                adopter.salt = salt;
                context.Users.Add(adopter);
            }

            // 1.5 Pending Users
            if (!context.Users.Any(u => u.email == "shelter.pending@petadopt.com"))
            {
                var pendingShelter = new User
                {
                    email = "shelter.pending@petadopt.com",
                    first_name = "Golden",
                    last_name = "Paws Sanctuary",
                    phone = encryptionService.Encrypt("0123456789"),
                    city = "Alexandria",
                    country = "Egypt",
                    role = Role.Shelter,
                    account_status = Status.Pending,
                    created_at = DateTime.UtcNow,
                    updated_at = DateTime.UtcNow
                };
                CreatePasswordHash("Shelter@123", out string hash, out string salt);
                pendingShelter.password_hash = hash;
                pendingShelter.salt = salt;
                context.Users.Add(pendingShelter);
            }

            if (!context.Users.Any(u => u.email == "adopter.pending@petadopt.com"))
            {
                var pendingAdopter = new User
                {
                    email = "adopter.pending@petadopt.com",
                    first_name = "Jane",
                    last_name = "Smith",
                    phone = encryptionService.Encrypt("9876543210"),
                    city = "Cairo",
                    country = "Egypt",
                    role = Role.Adopter,
                    account_status = Status.Pending,
                    created_at = DateTime.UtcNow,
                    updated_at = DateTime.UtcNow
                };
                CreatePasswordHash("Adopter@123", out string hash, out string salt);
                pendingAdopter.password_hash = hash;
                pendingAdopter.salt = salt;
                context.Users.Add(pendingAdopter);
            }

            context.SaveChanges();

            // 2. Create Pets (Idempotent)
            if (!context.Pets.Any(p => p.Status == PetStatus.PendingReview))
            {
                var petsList = new List<Pet>
                {
                    new Pet
                    {
                        OwnerId = shelter?.id ?? 0,
                        Name = "Oliver",
                        Breed = "Dachshund",
                        Age = 4,
                        AgeUnit = 0,
                        Species = Species.Dog,
                        Gender = Gender.Male,
                        Status = PetStatus.PendingReview,
                        HealthStatus = "Initial checkup done",
                        Description = "A tiny puppy looking for a warm home.",
                        Location = "Giza",
                        CreatedAt = DateTime.UtcNow,
                        ImageUrls = "https://images.unsplash.com/photo-1512750117205-1f33224908e0?w=800&q=80"
                    },
                    new Pet
                    {
                        OwnerId = shelter?.id ?? 0,
                        Name = "Bella",
                        Breed = "Persian",
                        Age = 2,
                        AgeUnit = 1,
                        Species = Species.Cat,
                        Gender = Gender.Female,
                        Status = PetStatus.PendingReview,
                        HealthStatus = "Healthy",
                        Description = "A very calm and fluffy cat.",
                        Location = "Cairo",
                        CreatedAt = DateTime.UtcNow,
                        ImageUrls = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80"
                    }
                };
                context.Pets.AddRange(petsList);
                context.SaveChanges();
            }
        }

        private static void CreatePasswordHash(string password, out string hash, out string salt)
        {
            using var hmac = new System.Security.Cryptography.HMACSHA512();
            salt = Convert.ToBase64String(hmac.Key);
            hash = Convert.ToBase64String(hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)));
        }
    }
}
