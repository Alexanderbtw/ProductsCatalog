using Microsoft.AspNetCore.Mvc;
using ProductsCatalog.Business.Models;

namespace ProductsCatalog.Frontend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeviceController : Controller
    {
        [HttpGet]
        [Route("getall")]
        public IActionResult GetAll()
        {
            Device iphone = new Device() {
                Id = 1, Title = "Iphone 14", Price = 100, Description = "Real Iphone!!!", 
                Camera = "144MP", CreationTime = DateTime.Now, CPU = "M1", Manufacturer = "Apple"
            };
            Device laptop = new Device() { 
                Id = 2, CreationTime = DateTime.UtcNow, Price = 1000, Description = "Not",
                CPU = "Intel i10", GPU = "RTX 1010", Manufacturer = "Lenovo", Title = "Legion 5"
            };
            List<Device> devicesInfo = new List<Device>() { iphone, laptop };
            return new JsonResult(devicesInfo);
        }

        [HttpGet]
        [Route("get/{id?}")]
        public IActionResult GetSingle([FromRoute] int? id) 
        {
            if (!id.HasValue)
            {
                return NotFound("Id not provided");
            }

            Device deviceInfo = new Device() {
                Id = 1,
                Title = "Iphone 1",
                Price = 100,
                Description = "Real Iphone!!!",
                Camera = "144MP",
                CreationTime = DateTime.Now,
                CPU = "M1",
                Manufacturer = "Apple"
            };
            return new JsonResult(deviceInfo);
        }
    }
}
