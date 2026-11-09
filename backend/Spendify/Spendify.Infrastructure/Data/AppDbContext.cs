using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Spendify.Application.Categories.Policies;
using Spendify.Domain.Models;
using Spendify.Infrastructure.Authentication;

namespace Spendify.Infrastructure.Data;

public class AppDbContext: IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>
{
    public AppDbContext(DbContextOptions<AppDbContext> _options): base(_options) {}

    public DbSet<Wallet> Wallets { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<UserCategory> UserCategories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<AppUser>(entity =>
        {
            entity.HasIndex(user => user.NormalizedEmail)
                .IsUnique()
                .HasDatabaseName("EmailIndex")
                .HasFilter("\"NormalizedEmail\" IS NOT NULL");
        });

        modelBuilder.Entity<Wallet>(entity =>
        {
            entity.HasOne<AppUser>()
                .WithMany(user => user.Wallets)
                .HasForeignKey(wallet => wallet.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            // Note max length — keep in sync with TransactionPolicy.NoteMaxLength.
            entity.Property(transaction => transaction.Note)
                .HasMaxLength(200);

            entity.Property(transaction => transaction.Amount)
                .HasPrecision(11, 2);

            entity.HasOne(transaction => transaction.Category)
                .WithMany()
                .HasForeignKey(transaction => transaction.CategoryId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        });

        modelBuilder.Entity<UserCategory>(entity =>
        {
            entity.Property(category => category.Name)
                .HasMaxLength(CategoryPolicy.NameMaxLength);

            entity.Property(category => category.NormalizedName)
                .HasMaxLength(CategoryPolicy.NormalizedNameMaxLength);

            entity.Property(category => category.IconKey)
                .HasMaxLength(CategoryPolicy.IconKeyMaxLength);

            entity.HasOne<AppUser>()
                .WithMany()
                .HasForeignKey(category => category.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            entity.HasIndex(category => new { category.UserId, category.Kind, category.NormalizedName })
                .IsUnique()
                .HasDatabaseName("IX_UserCategories_UserId_Kind_NormalizedName");
        });
    }
}