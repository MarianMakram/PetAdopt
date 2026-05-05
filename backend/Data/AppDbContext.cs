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
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var statusConverter = new ValueConverter<Status, string>(
                v => v.ToString().ToLower(),
                v => (Status)Enum.Parse(typeof(Status), v, true));

            var roleConverter = new ValueConverter<Role, string>(
                v => v == Role.Shelter ? "shelter_owner" : v.ToString().ToLower(),
                v => v == "shelter_owner" ? Role.Shelter : (Role)Enum.Parse(typeof(Role), v, true));

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.first_name).HasColumnName("first_name");
                entity.Property(e => e.last_name).HasColumnName("last_name");
                entity.Property(e => e.email).HasColumnName("email");
                entity.Property(e => e.password_hash).HasColumnName("password_hash");

                entity.Property(e => e.role)
                      .HasColumnName("role")
                      .HasConversion(roleConverter);

                entity.Property(e => e.account_status)
                      .HasColumnName("account_status")
                      .HasConversion(statusConverter);

                entity.Property(e => e.phone).HasColumnName("phone");
                entity.Property(e => e.city).HasColumnName("city");
                entity.Property(e => e.country).HasColumnName("country");
                entity.Property(e => e.created_at).HasColumnName("created_at");
                entity.Property(e => e.updated_at).HasColumnName("updated_at");
            });

            modelBuilder.Entity<RefreshToken>(entity =>
            {
                entity.ToTable("RefreshTokens");
                entity.HasOne(rt => rt.User)
                      .WithMany(u => u.RefreshTokens)
                      .HasForeignKey(rt => rt.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<AdoptionRequest>(entity =>
            {
                entity.ToTable("adoptionrequest");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.PetId).HasColumnName("pet_id");
                entity.Property(e => e.AdopterId).HasColumnName("adopter_id");
                entity.Property(e => e.OwnerId).HasColumnName("owner_id");
                entity.Property(e => e.Message).HasColumnName("message");
                entity.Property(e => e.WhyThisPet).HasColumnName("why_this_pet");
                entity.Property(e => e.RejectionReason).HasColumnName("rejection_reason");
                entity.Property(e => e.RespondedAt).HasColumnName("responded_at");
                entity.Property(e => e.RequestedAt).HasColumnName("requested_at");
                
                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasConversion(new ValueConverter<RequestStatus, string>(
                        v => v.ToString().ToLower(),
                        v => (RequestStatus)Enum.Parse(typeof(RequestStatus), v, true)));
            });

            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Pet>().ToTable("pets");
            modelBuilder.Entity<Review>().ToTable("reviews");
            modelBuilder.Entity<Favorite>().ToTable("favorites");
            modelBuilder.Entity<Notification>().ToTable("notifications");
        }
    }
}