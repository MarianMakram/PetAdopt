using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PetAdopt.Data;
using PetAdopt.Models;

namespace PetAdopt.Scratch
{
    public class DbCheck
    {
        public static void Run(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            
            var petCount = context.Pets.Count();
            var userCount = context.Users.Count();
            
            Console.WriteLine($"Total Pets: {petCount}");
            Console.WriteLine($"Total Users: {userCount}");
            
            var shelters = context.Users.Where(u => u.role == Role.Shelter).ToList();
            foreach (var s in shelters)
            {
                var sPetCount = context.Pets.Count(p => p.OwnerId == s.id);
                Console.WriteLine($"Shelter {s.email} (ID: {s.id}) has {sPetCount} pets.");
            }
        }
    }
}
