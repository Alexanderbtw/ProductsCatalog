using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductsCatalog.Business.Models;
using ProductsCatalog.DAL;
using ProductsCatalog.DAL.Repositories;
using System.Text.Json.Nodes;

namespace ProductsCatalog.Frontend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ClothController : Controller
    {
        private readonly EFRepository<Cloth, ProductContext> clothRepo;
        private readonly ILogger logger;

        public ClothController(EFRepository<Cloth, ProductContext> repo, ILogger<ClothController> _logger)
        {
            clothRepo = repo;
            logger = _logger;
            //Initialize().GetAwaiter().GetResult();
        }

        [HttpGet]
        [Route("getall")]
        public IActionResult GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string search = "")
        {
            search = search.ToLower();

            var request = clothRepo.GetAllWithoutTracking().Where(p => p.Title.ToLower().Contains(search) || p.Cathegory.ToLower().Contains(search));
            int totalCount = request.Count();

            List<Cloth> productsInfo = request
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return new JsonResult(new { productsInfo, totalCount });
        }

        [HttpGet]
        [Route("get/{id?}")]
        public IActionResult GetSingle([FromRoute] int? id)
        {
            if (!id.HasValue)
            {
                return NotFound("Id not provided");
            }

            Cloth? clothInfo = clothRepo.GetWithoutTracking(item => item.Id == id.Value);
            if (clothInfo == null)
            {
                return NotFound();
            }

            return new JsonResult(clothInfo);
        }

        [HttpPost]
        [Route("create")]
        [Authorize(Roles = "Admin")]
        public IActionResult CreateCloth(Cloth cloth)
        {
            if (cloth == null)
            {
                return BadRequest("Cloth not provided");
            }

            cloth.CreationTime = DateTime.UtcNow;
            clothRepo.Add(cloth);
            clothRepo.Save();

            return Content(cloth.Id.ToString());
        }

        [HttpDelete]
        [Route("delete/{id?}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteCloth([FromRoute] int? id)
        {
            if (!id.HasValue)
            {
                return NotFound("Id not provided");
            }

            clothRepo.Delete(new Cloth() { Id = (int)id });
            clothRepo.Save();
            return Ok();
        }

        [HttpPut]
        [Route("edit")]
        [Authorize(Roles = "Admin")]
        public IActionResult EditCloth(Cloth cloth)
        {
            if (cloth == null)
            {
                return BadRequest("Cloth not provided");
            }

            clothRepo.Update(cloth);
            clothRepo.Save();

            return Content(cloth.Id.ToString());
        }

        [NonAction]
        private async Task Initialize()
        {
            string url = "https://api.escuelajs.co/api/v1/products/?categoryId=1";

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

                    clothRepo.Add(new Cloth()
                    {
                        Title = (string)node["title"],
                        Price = (decimal)node["price"],
                        Description = (string)node["description"],
                        Picture = pictureArray != null ? Convert.ToBase64String(pictureArray) : null,
                        CreationTime = DateTime.SpecifyKind(creationTime, DateTimeKind.Utc),
                        Cathegory = "Automatically"
                    });
                }

                clothRepo.Save();
            }
            catch (Exception ex)
            {
                logger.LogCritical("Error during initialization: {0}", ex.Message);
            }
        }
    }
}
