using Microsoft.EntityFrameworkCore;
using ProductsCatalog.Business.Models;
using ProductsCatalog.DAL;
using ProductsCatalog.DAL.Repositories;
using System.Diagnostics;
namespace ProductsCatalog.Tests
{
    [TestClass]
    public class RepositoryTest
    {
        private static ProductContext? _dbMemContext;

        [ClassInitialize]
        public static void ClassInitialize(TestContext testContext)
        {
            DbContextOptionsBuilder<ProductContext> optionsBuilder = new DbContextOptionsBuilder<ProductContext>().UseInMemoryDatabase("ProductsCatalogInMemory");

            _dbMemContext = new ProductContext(optionsBuilder.Options);

            _dbMemContext.Devices.AddRange(
                new Device() { Id = 1, CreationTime = DateTime.UtcNow, Title = "TestDevice1" },
                new Device() { Id = 2, CreationTime = DateTime.UtcNow, Title = "TestDevice2" },
                new Device() { Id = 3, CreationTime = DateTime.UtcNow, Title = "TestDevice3" }
            );
            _dbMemContext.Clothes.AddRange(
                new Cloth() { Id = 1, CreationTime = DateTime.UtcNow, Title = "TestCloth1" },
                new Cloth() { Id = 2, CreationTime = DateTime.UtcNow, Title = "TestCloth2" },
                new Cloth() { Id = 3, CreationTime = DateTime.UtcNow, Title = "TestCloth3" }
            );
            _dbMemContext.SaveChanges();
        }

        [ClassCleanup]
        public static void ClassCleanup()
        {
            _dbMemContext?.Dispose();
        }

        [TestMethod]
        public void Device_GetWithRepository()
        {
            EFRepository<Device, ProductContext> repo = new(_dbMemContext!);
            List<Device> devices = [.. repo.GetAllWithoutTracking().Take(2)];

            foreach (Device device in devices)
            {
                Debug.WriteLine(device.Title);
            }

            Assert.IsTrue(devices.Count != 0);
        }

        [TestMethod]
        public void Cloth_GetWithRepository()
        {
            EFRepository<Cloth, ProductContext> repo = new(_dbMemContext!);
            List<Cloth> clothes = [.. repo.GetAllWithoutTracking().Take(3)];

            foreach (var cloth in clothes)
            {
                Debug.WriteLine(cloth.Title);
            }

            Assert.IsTrue(clothes.Count != 0);
        }
    }
}
