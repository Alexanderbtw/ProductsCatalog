using Microsoft.EntityFrameworkCore;
using ProductsCatalog.Business.Models;

namespace ProductsCatalog.DAL
{
    public class ProductContext : DbContext
    {
        public DbSet<Device> Devices { get; set; }
        public DbSet<Cloth> Clothes { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Furniture> Furnitures { get; set; }

        public ProductContext() : base() { }

        public ProductContext(DbContextOptions options) : base(options)
        {
            //Database.EnsureCreated();
            //Database.Migrate();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder
                .Entity<Device>()
                .Property(d => d.Picture)
                .HasConversion(
                    p => Convert.FromBase64String(p ?? ""),
                    p => Convert.ToBase64String(p));

            modelBuilder
                .Entity<Cloth>()
                .Property(c => c.Picture)
                .HasConversion(
                    p => Convert.FromBase64String(p ?? ""),
                    p => Convert.ToBase64String(p));
        }
    }
}
