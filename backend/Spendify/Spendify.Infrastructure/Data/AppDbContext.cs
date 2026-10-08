using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Spendify.Domain.Models;
using Spendify.Infrastructure.Authentication;

namespace Spendify.Infrastructure.Data;

public class AppDbContext: IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>
{
    public AppDbContext(DbContextOptions<AppDbContext> _options): base(_options) {}

    public DbSet<Wallet> Wallets { get; set; }
    public DbSet<Transaction> Transactions { get; set; }

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
        });
    }
}