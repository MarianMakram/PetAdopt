using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetAdopt.Migrations
{
    /// <inheritdoc />
    public partial class AddAdoptionRequestTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdoptionRequests_Pets_PetId",
                table: "AdoptionRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_AdoptionRequests_Users_AdopterId",
                table: "AdoptionRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_Favorites_Pets_PetId",
                table: "Favorites");

            migrationBuilder.DropForeignKey(
                name: "FK_Favorites_Users_UserId",
                table: "Favorites");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Users_userid",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_RefreshTokens_Users_UserId",
                table: "RefreshTokens");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Pets_PetId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Users_AdopterId",
                table: "Reviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reviews",
                table: "Reviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Pets",
                table: "Pets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Notifications",
                table: "Notifications");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Favorites",
                table: "Favorites");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AdoptionRequests",
                table: "AdoptionRequests");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "users");

            migrationBuilder.RenameTable(
                name: "Reviews",
                newName: "reviews");

            migrationBuilder.RenameTable(
                name: "Pets",
                newName: "pets");

            migrationBuilder.RenameTable(
                name: "Notifications",
                newName: "notifications");

            migrationBuilder.RenameTable(
                name: "Favorites",
                newName: "favorites");

            migrationBuilder.RenameTable(
                name: "AdoptionRequests",
                newName: "adoptionrequest");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_PetId",
                table: "reviews",
                newName: "IX_reviews_PetId");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_AdopterId",
                table: "reviews",
                newName: "IX_reviews_AdopterId");

            migrationBuilder.RenameIndex(
                name: "IX_Notifications_userid",
                table: "notifications",
                newName: "IX_notifications_userid");

            migrationBuilder.RenameIndex(
                name: "IX_Favorites_UserId",
                table: "favorites",
                newName: "IX_favorites_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Favorites_PetId",
                table: "favorites",
                newName: "IX_favorites_PetId");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "adoptionrequest",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "Message",
                table: "adoptionrequest",
                newName: "message");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "adoptionrequest",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "WhyThisPet",
                table: "adoptionrequest",
                newName: "why_this_pet");

            migrationBuilder.RenameColumn(
                name: "RespondedAt",
                table: "adoptionrequest",
                newName: "responded_at");

            migrationBuilder.RenameColumn(
                name: "RequestedAt",
                table: "adoptionrequest",
                newName: "requested_at");

            migrationBuilder.RenameColumn(
                name: "RejectionReason",
                table: "adoptionrequest",
                newName: "rejection_reason");

            migrationBuilder.RenameColumn(
                name: "PetId",
                table: "adoptionrequest",
                newName: "pet_id");

            migrationBuilder.RenameColumn(
                name: "AdopterId",
                table: "adoptionrequest",
                newName: "adopter_id");

            migrationBuilder.RenameIndex(
                name: "IX_AdoptionRequests_PetId",
                table: "adoptionrequest",
                newName: "IX_adoptionrequest_pet_id");

            migrationBuilder.RenameIndex(
                name: "IX_AdoptionRequests_AdopterId",
                table: "adoptionrequest",
                newName: "IX_adoptionrequest_adopter_id");

            migrationBuilder.AlterColumn<string>(
                name: "status",
                table: "adoptionrequest",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "owner_id",
                table: "adoptionrequest",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_users",
                table: "users",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_reviews",
                table: "reviews",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_pets",
                table: "pets",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_notifications",
                table: "notifications",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_favorites",
                table: "favorites",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_adoptionrequest",
                table: "adoptionrequest",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_adoptionrequest_pets_pet_id",
                table: "adoptionrequest",
                column: "pet_id",
                principalTable: "pets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_adoptionrequest_users_adopter_id",
                table: "adoptionrequest",
                column: "adopter_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_favorites_pets_PetId",
                table: "favorites",
                column: "PetId",
                principalTable: "pets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_favorites_users_UserId",
                table: "favorites",
                column: "UserId",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_notifications_users_userid",
                table: "notifications",
                column: "userid",
                principalTable: "users",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_RefreshTokens_users_UserId",
                table: "RefreshTokens",
                column: "UserId",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_reviews_pets_PetId",
                table: "reviews",
                column: "PetId",
                principalTable: "pets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_reviews_users_AdopterId",
                table: "reviews",
                column: "AdopterId",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_adoptionrequest_pets_pet_id",
                table: "adoptionrequest");

            migrationBuilder.DropForeignKey(
                name: "FK_adoptionrequest_users_adopter_id",
                table: "adoptionrequest");

            migrationBuilder.DropForeignKey(
                name: "FK_favorites_pets_PetId",
                table: "favorites");

            migrationBuilder.DropForeignKey(
                name: "FK_favorites_users_UserId",
                table: "favorites");

            migrationBuilder.DropForeignKey(
                name: "FK_notifications_users_userid",
                table: "notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_RefreshTokens_users_UserId",
                table: "RefreshTokens");

            migrationBuilder.DropForeignKey(
                name: "FK_reviews_pets_PetId",
                table: "reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_reviews_users_AdopterId",
                table: "reviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_users",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_reviews",
                table: "reviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_pets",
                table: "pets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_notifications",
                table: "notifications");

            migrationBuilder.DropPrimaryKey(
                name: "PK_favorites",
                table: "favorites");

            migrationBuilder.DropPrimaryKey(
                name: "PK_adoptionrequest",
                table: "adoptionrequest");

            migrationBuilder.DropColumn(
                name: "owner_id",
                table: "adoptionrequest");

            migrationBuilder.RenameTable(
                name: "users",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "reviews",
                newName: "Reviews");

            migrationBuilder.RenameTable(
                name: "pets",
                newName: "Pets");

            migrationBuilder.RenameTable(
                name: "notifications",
                newName: "Notifications");

            migrationBuilder.RenameTable(
                name: "favorites",
                newName: "Favorites");

            migrationBuilder.RenameTable(
                name: "adoptionrequest",
                newName: "AdoptionRequests");

            migrationBuilder.RenameIndex(
                name: "IX_reviews_PetId",
                table: "Reviews",
                newName: "IX_Reviews_PetId");

            migrationBuilder.RenameIndex(
                name: "IX_reviews_AdopterId",
                table: "Reviews",
                newName: "IX_Reviews_AdopterId");

            migrationBuilder.RenameIndex(
                name: "IX_notifications_userid",
                table: "Notifications",
                newName: "IX_Notifications_userid");

            migrationBuilder.RenameIndex(
                name: "IX_favorites_UserId",
                table: "Favorites",
                newName: "IX_Favorites_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_favorites_PetId",
                table: "Favorites",
                newName: "IX_Favorites_PetId");

            migrationBuilder.RenameColumn(
                name: "status",
                table: "AdoptionRequests",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "message",
                table: "AdoptionRequests",
                newName: "Message");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "AdoptionRequests",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "why_this_pet",
                table: "AdoptionRequests",
                newName: "WhyThisPet");

            migrationBuilder.RenameColumn(
                name: "responded_at",
                table: "AdoptionRequests",
                newName: "RespondedAt");

            migrationBuilder.RenameColumn(
                name: "requested_at",
                table: "AdoptionRequests",
                newName: "RequestedAt");

            migrationBuilder.RenameColumn(
                name: "rejection_reason",
                table: "AdoptionRequests",
                newName: "RejectionReason");

            migrationBuilder.RenameColumn(
                name: "pet_id",
                table: "AdoptionRequests",
                newName: "PetId");

            migrationBuilder.RenameColumn(
                name: "adopter_id",
                table: "AdoptionRequests",
                newName: "AdopterId");

            migrationBuilder.RenameIndex(
                name: "IX_adoptionrequest_pet_id",
                table: "AdoptionRequests",
                newName: "IX_AdoptionRequests_PetId");

            migrationBuilder.RenameIndex(
                name: "IX_adoptionrequest_adopter_id",
                table: "AdoptionRequests",
                newName: "IX_AdoptionRequests_AdopterId");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "AdoptionRequests",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reviews",
                table: "Reviews",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Pets",
                table: "Pets",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Notifications",
                table: "Notifications",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Favorites",
                table: "Favorites",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdoptionRequests",
                table: "AdoptionRequests",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AdoptionRequests_Pets_PetId",
                table: "AdoptionRequests",
                column: "PetId",
                principalTable: "Pets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AdoptionRequests_Users_AdopterId",
                table: "AdoptionRequests",
                column: "AdopterId",
                principalTable: "Users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Favorites_Pets_PetId",
                table: "Favorites",
                column: "PetId",
                principalTable: "Pets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Favorites_Users_UserId",
                table: "Favorites",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Users_userid",
                table: "Notifications",
                column: "userid",
                principalTable: "Users",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_RefreshTokens_Users_UserId",
                table: "RefreshTokens",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Pets_PetId",
                table: "Reviews",
                column: "PetId",
                principalTable: "Pets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Users_AdopterId",
                table: "Reviews",
                column: "AdopterId",
                principalTable: "Users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
