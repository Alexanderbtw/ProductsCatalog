using Microsoft.EntityFrameworkCore;
using ProductsCatalog.Business.Models;

namespace ProductsCatalog.DAL
{
    public class ProductContext : DbContext
    {
        public DbSet<Device> Devices { get; set; }

        public DbSet<Cloth> Clothes { get; set; }

        public ProductContext() { }

        public ProductContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
            //Database.Migrate();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
