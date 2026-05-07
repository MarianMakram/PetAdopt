using Microsoft.Extensions.DependencyInjection;
using PetAdopt.Models;

namespace PetAdopt.Data
{
    public static class DatabaseSeeder
    {
        public static void Seed(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                context.Database.EnsureCreated();

                if (!context.Users.Any())
                {
                    var admin = new User
                    {
                        email = "admin@petadopt.com",
                        password_hash = "AQAAAAEAACcQAAAAEFVl/r/v9vVv9vVv9vVv9vVv9vVv9vVv9vVv9vVv9vVv9vVv9vVv9vVv9v==", // Placeholder
                        salt = "salt",
                        first_name = "Admin",
                        last_name = "System",
                        role = Role.Admin,
                        account_status = Status.Approved
                    };

                    var shelter = new User
                    {
                        email = "shelter@test.com",
                        password_hash = "AQAAAAEAACcQAAAAEFVl/r/v9vVv9vVv9vVv9vVv9vVv9vVv9vVv9vVv9vVv9vVv9vVv9vVv9v==", // Placeholder
                        salt = "salt",
                        first_name = "Happy",
                        last_name = "Shelter",
                        role = Role.Shelter,
                        account_status = Status.Approved
                    };

                    var adopter = new User
                    {
                        email = "adopter@test.com",
                        password_hash = "AQAAAAEAACcQAAAAEFVl/r/v9vVv9vVv9vVv9vVv9vVv9vVv9vVv9vVv9vVv9vVv9vVv9vVv9v==", // Placeholder
                        salt = "salt",
                        first_name = "John",
                        last_name = "Adopter",
                        role = Role.Adopter,
                        account_status = Status.Approved
                    };

                    context.Users.AddRange(admin, shelter, adopter);
                    context.SaveChanges();

                    // if (!context.Pets.Any())
                    // {
                    //     context.Pets.AddRange(
                    //         new Pet { OwnerId = shelter.id, Name = "Buddy", Species = Species.Dog, Breed = "Golden Retriever", Age = 2, Gender = Gender.Male, Status = PetStatus.Approved, IsVaccinated = true, IsNeutered = true, Location = "Cairo", Description = "Very friendly dog.", ImageUrl = "https://tse3.mm.bing.net/th/id/OIP.wSX6KbvkcpQOggkqRowLGgHaFF?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
                    //         new Pet { OwnerId = shelter.id, Name = "Luna", Species = Species.Cat, Breed = "Persian", Age = 1, Gender = Gender.Female, Status = PetStatus.Approved, IsVaccinated = true, IsNeutered = true, Location = "Alexandria", Description = "Quiet and sweet cat.", ImageUrl = "https://tse3.mm.bing.net/th/id/OIP.wSX6KbvkcpQOggkqRowLGgHaFF?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" }
                    //     );
                    //     context.SaveChanges();
                    // }
                }
            }
        }
    }
}
