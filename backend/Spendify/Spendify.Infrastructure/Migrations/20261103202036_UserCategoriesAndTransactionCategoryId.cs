using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Spendify.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UserCategoriesAndTransactionCategoryId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // V1: no enum→categoryId mapping — wipe legacy transaction rows (see dev-database-reset.md).
            migrationBuilder.Sql("DELETE FROM \"Transactions\";");

            migrationBuilder.CreateTable(
                name: "UserCategories",
                columns: table => new
                {
                    UserCategoryId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    NormalizedName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    IconKey = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    Kind = table.Column<int>(type: "integer", nullable: false),
                    IsSystemSeed = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCategories", x => x.UserCategoryId);
                    table.ForeignKey(
                        name: "FK_UserCategories_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserCategories_UserId_Kind_NormalizedName",
                table: "UserCategories",
                columns: new[] { "UserId", "Kind", "NormalizedName" },
                unique: true);

            // Same default system rows as UserCategorySeedHelper (Expense + Income "Other").
            migrationBuilder.Sql(
                """
                INSERT INTO "UserCategories" (
                    "UserCategoryId",
                    "UserId",
                    "Name",
                    "NormalizedName",
                    "IconKey",
                    "Kind",
                    "IsSystemSeed",
                    "CreatedAtUtc")
                SELECT
                    gen_random_uuid(),
                    u."Id",
                    'Other',
                    'OTHER',
                    'other',
                    kind_val,
                    TRUE,
                    (NOW() AT TIME ZONE 'UTC')
                FROM "AspNetUsers" AS u
                CROSS JOIN (VALUES (0), (1)) AS kinds(kind_val);
                """);

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Transactions");

            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "Transactions",
                type: "uuid",
                nullable: false);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_CategoryId",
                table: "Transactions",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_UserCategories_CategoryId",
                table: "Transactions",
                column: "CategoryId",
                principalTable: "UserCategories",
                principalColumn: "UserCategoryId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_UserCategories_CategoryId",
                table: "Transactions");

            migrationBuilder.DropTable(
                name: "UserCategories");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_CategoryId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Transactions");

            migrationBuilder.AddColumn<int>(
                name: "Category",
                table: "Transactions",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
