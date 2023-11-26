using Microsoft.EntityFrameworkCore;
using ProductsCatalog.Business.Models;
using ProductsCatalog.DAL;
using ProductsCatalog.DAL.Repositories;

namespace ProductsCatalog.Tests
{
    [TestClass]
    public class ConnectionTest
    {
        ProductContext? _dbContext;

        [TestInitialize] 
        public void Init() 
        {
            string connectionString = "User ID=postgres;Password=Samara2752777;Host=localhost;Port=5432;Database=ProductsCatalog;";
            DbContextOptionsBuilder<ProductContext> optionsBuilder = new DbContextOptionsBuilder<ProductContext>();
            optionsBuilder.UseNpgsql(connectionString);

            _dbContext = new ProductContext(optionsBuilder.Options);
        }

        [TestCleanup]
        public void Cleanup()
        {
            _dbContext?.Dispose();
        }

        [TestMethod]
        public void DeviceConnectionTest()
        {
            var actual = _dbContext?.Devices;

            Assert.IsNotNull(actual);
        }

        [TestMethod]
        public void ClothConnectionTest()
        {
            var actual = _dbContext?.Clothes;

            Assert.IsNotNull(actual);
        }
    }
}