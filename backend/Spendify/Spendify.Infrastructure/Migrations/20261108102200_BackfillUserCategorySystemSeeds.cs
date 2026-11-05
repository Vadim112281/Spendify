using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Spendify.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class BackfillUserCategorySystemSeeds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Idempotent: users who already have seeded "Other" rows (register or prior migration SQL) are skipped.
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
                    kinds.kind_val,
                    TRUE,
                    (NOW() AT TIME ZONE 'UTC')
                FROM "AspNetUsers" AS u
                CROSS JOIN (VALUES (0), (1)) AS kinds(kind_val)
                WHERE NOT EXISTS (
                    SELECT 1
                    FROM "UserCategories" AS uc
                    WHERE uc."UserId" = u."Id"
                      AND uc."Kind" = kinds.kind_val
                      AND uc."NormalizedName" = 'OTHER');
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                """
                DELETE FROM "UserCategories"
                WHERE "IsSystemSeed" = TRUE
                  AND "Name" = 'Other'
                  AND "NormalizedName" = 'OTHER'
                  AND "IconKey" = 'other';
                """);
        }
    }
}
