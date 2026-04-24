using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PetAdopt.Models;

namespace PetAdopt.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Pet> Pets { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<AdoptionRequest> AdoptionRequests { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Value Converters
            var statusConverter = new ValueConverter<Status, string>(
                v => v.ToString().ToLower(),
                v => (Status)Enum.Parse(typeof(Status), v, true));

            var roleConverter = new ValueConverter<Role, string>(
                v => v == Role.Shelter ? "shelter_owner" : v.ToString().ToLower(),
                v => v == "shelter_owner" ? Role.Shelter : (Role)Enum.Parse(typeof(Role), v, true));

            var petStatusConverter = new ValueConverter<PetStatus, string>(
                v => v.ToString().ToLower().Replace("pendingreview", "pending_review"),
                v => (PetStatus)Enum.Parse(typeof(PetStatus), v.Replace("_", ""), true));

            // User mapping
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");
                entity.Property(e => e.id).HasColumnName("id");
                entity.Property(e => e.first_name).HasColumnName("first_name");
                entity.Property(e => e.last_name).HasColumnName("last_name");
                entity.Property(e => e.email).HasColumnName("email");
                entity.Property(e => e.password_hash).HasColumnName("password_hash");
                entity.Property(e => e.role).HasColumnName("role").HasConversion(roleConverter);
                entity.Property(e => e.account_status).HasColumnName("account_status").HasConversion(statusConverter);
                entity.Property(e => e.phone).HasColumnName("phone");
                entity.Property(e => e.city).HasColumnName("city");
                entity.Property(e => e.country).HasColumnName("country");
                entity.Property(e => e.created_at).HasColumnName("created_at");
                entity.Property(e => e.updated_at).HasColumnName("updated_at");
            });

            // Pet mapping
            modelBuilder.Entity<Pet>(entity =>
            {
                entity.ToTable("pets");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.OwnerId).HasColumnName("owner_id");
                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.Breed).HasColumnName("breed");
                entity.Property(e => e.Age).HasColumnName("age");
                entity.Property(e => e.AgeUnit).HasColumnName("age_unit");
                entity.Property(e => e.Species).HasColumnName("species").HasConversion<string>();
                entity.Property(e => e.Gender).HasColumnName("gender").HasConversion<string>();
                entity.Property(e => e.Status).HasColumnName("status").HasConversion(petStatusConverter);
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.Location).HasColumnName("location");
                entity.Property(e => e.ImageUrls).HasColumnName("image_urls");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            });

            // AdoptionRequest mapping
            modelBuilder.Entity<AdoptionRequest>(entity =>
            {
                entity.ToTable("adoption_request");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.PetId).HasColumnName("pet_id");
                entity.Property(e => e.AdopterId).HasColumnName("adopter_id");
                entity.Property(e => e.Message).HasColumnName("message");
                entity.Property(e => e.WhyThisPet).HasColumnName("why_this_pet");
                entity.Property(e => e.Status).HasColumnName("status").HasConversion<string>();
                entity.Property(e => e.RejectionReason).HasColumnName("rejection_reason");
                entity.Property(e => e.RespondedAt).HasColumnName("responded_at");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");
                entity.Property(e => e.RequestedAt).HasColumnName("requested_at");
            });

            // Favorite mapping
            modelBuilder.Entity<Favorite>(entity =>
            {
                entity.ToTable("favorites");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.UserId).HasColumnName("user_id");
                entity.Property(e => e.PetId).HasColumnName("pet_id");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            });

            // Review mapping
            modelBuilder.Entity<Review>(entity =>
            {
                entity.ToTable("reviews");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.PetId).HasColumnName("pet_id");
                entity.Property(e => e.AdopterId).HasColumnName("adopter_id");
                entity.Property(e => e.Rating).HasColumnName("rating");
                entity.Property(e => e.Comment).HasColumnName("comment");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            });

            // RefreshToken mapping
            modelBuilder.Entity<RefreshToken>(entity =>
            {
                entity.ToTable("refreshtokens");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Token).HasColumnName("token");
                entity.Property(e => e.Created).HasColumnName("created_at");
                entity.Property(e => e.Expires).HasColumnName("expires_at");
                entity.Property(e => e.Revoked).HasColumnName("revoked_at");
                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(rt => rt.User)
                      .WithMany(u => u.RefreshTokens)
                      .HasForeignKey(rt => rt.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}