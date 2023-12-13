using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ProductsCatalog.Business.Models;
using ProductsCatalog.DAL;
using ProductsCatalog.DAL.Extensions;
using ProductsCatalog.DAL.Repositories;
using System.Text.Json.Nodes;

namespace ProductsCatalog.Frontend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class DeviceController : Controller
    {
        private readonly EFRepository<Device, ProductContext> deviceRepo;
        private readonly ILogger logger;

        public DeviceController(EFRepository<Device, ProductContext> repo, ILogger<DeviceController> _logger)
        {
            deviceRepo = repo;
            logger = _logger;
            //Initialize().GetAwaiter().GetResult();
        }

        [HttpGet]
        [Route("getall")]
        public IActionResult GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string search = "", [FromQuery] string sortField = "Id", [FromQuery] bool isDescend = false, [FromQuery] string selectedCathegories = "")
        {
            var request = deviceRepo.GetAllWithoutTracking();

            if (!search.IsNullOrEmpty())
            {
                search = search.ToLower();
                request = request.Where(p => p.Title.ToLower().Contains(search));
            }

            string[] cathegories = request.Select(p => p.Cathegory).Distinct().ToArray();

            if (!selectedCathegories.IsNullOrEmpty())
            {
                request = request.Where(p => selectedCathegories.Contains(p.Cathegory));
            }

            if (!sortField.IsNullOrEmpty())
            {
                var propName = char.ToUpper(sortField[0]) + sortField.Substring(1);

                if (isDescend)
                    request = request.OrderByDescending<Device>(propName);
                else
                    request = request.OrderBy<Device>(propName);
            }

            int totalCount = request.Count();

            List<Device> productsInfo = request
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return new JsonResult(new { productsInfo, cathegories, totalCount });
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

        [NonAction]
        private async Task Initialize()
        {
            string url = "https://api.escuelajs.co/api/v1/products/?categoryId=2";

            using HttpClient httpClient = new HttpClient();
            var response = await httpClient.GetFromJsonAsync<List<JsonNode>>(url);

            try
            {
                foreach (var node in response)
                {
                    string pictureUrl = (string)node["images"][0];
                    var pictureResponse = await httpClient.GetAsync(pictureUrl);
                    byte[]? pictureArray = null;
                    if (pictureResponse.IsSuccessStatusCode)
                    {
                        pictureArray = await pictureResponse.Content.ReadAsByteArrayAsync();
                    }

                    var creationTime = DateTime.Parse((string)node["creationAt"]);

                    deviceRepo.Add(new Device()
                    {
                        Title = (string)node["title"],
                        Price = (decimal)node["price"],
                        Description = (string)node["description"],
                        Picture = pictureArray != null ? Convert.ToBase64String(pictureArray) : null,
                        CreationTime = DateTime.SpecifyKind(creationTime, DateTimeKind.Utc),
                        Cathegory = "Automatically"
                    });
                }

                deviceRepo.Save();
            }
            catch (Exception ex)
            {
                logger.LogCritical("Error during initialization: {0}", ex.Message);
            }
        }
    }
}
