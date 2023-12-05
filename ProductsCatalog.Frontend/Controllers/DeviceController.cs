using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductsCatalog.Business.Models;
using ProductsCatalog.DAL;
using ProductsCatalog.DAL.Repositories;
using System.Diagnostics;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace ProductsCatalog.Frontend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class DeviceController : Controller
    {
        private readonly EFRepository<Device, ProductContext> deviceRepo;

        public DeviceController(EFRepository<Device, ProductContext> repo)
        {
            deviceRepo = repo;
        }

        [HttpGet]
        [Route("getall")]
        public IActionResult GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            int totalCount = deviceRepo.GetAll().Count();

            List<Device> devicesInfo = deviceRepo.GetAllWithoutTracking()
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return new JsonResult( new { devicesInfo, totalCount });
        }

        [HttpGet]
        [Route("get/{id?}")]
        public IActionResult GetSingle([FromRoute] int? id) 
        {
            if (!id.HasValue)
            {
                return NotFound("Id not provided");
            }

            Device? deviceInfo = deviceRepo.GetWithoutTracking(item => item.Id == id.Value);
            if (deviceInfo == null)
            {
                return NotFound();
            }

            return new JsonResult(deviceInfo);
        }

        [HttpPost]
        [Route("create")]
        [Authorize(Roles = "Admin")]
        public IActionResult CreateDevice(Device device)
        {
            if (device == null)
            {
                return BadRequest("Device not provided");
            }

            device.CreationTime = DateTime.UtcNow;
            deviceRepo.Add(device);
            deviceRepo.Save();

            return Content(device.Id.ToString());
        }

        [HttpDelete]
        [Route("delete/{id?}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteDevice([FromRoute] int? id)
        {
            if (!id.HasValue)
            {
                return NotFound("Id not provided");
            }

            deviceRepo.Delete(new Device() { Id = (int)id });
            deviceRepo.Save();
            return Ok();
        }

        [HttpPut]
        [Route("edit")]
        [Authorize(Roles = "Admin")]
        public IActionResult EditDevice(Device device)
        {
            if (device == null)
            {
                return BadRequest("Device not provided");
            }

            deviceRepo.Update(device);
            deviceRepo.Save();

            return Content(device.Id.ToString());
        }
    }
}
