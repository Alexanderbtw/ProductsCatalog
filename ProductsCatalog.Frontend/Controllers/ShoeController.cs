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
    public class ShoeController : Controller
    {
        private readonly EFRepository<Shoe, ProductContext> shoeRepo;
        private readonly ILogger logger;

        public ShoeController(EFRepository<Shoe, ProductContext> repo, ILogger<FurnitureController> _logger)
        {
            shoeRepo = repo;
            logger = _logger;
            //Initialize().GetAwaiter().GetResult();
        }

        [HttpGet]
        [Route("getall")]
        public IActionResult GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string search = "")
        {
            search = search.ToLower();

            var request = shoeRepo.GetAllWithoutTracking().Where(p => p.Title.ToLower().Contains(search) || p.Cathegory.ToLower().Contains(search));
            int totalCount = request.Count();

            List<Shoe> productsInfo = request
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

            Shoe? shoeInfo = shoeRepo.GetWithoutTracking(item => item.Id == id.Value);
            if (shoeInfo == null)
            {
                return NotFound();
            }

            return new JsonResult(shoeInfo);
        }

        [HttpPost]
        [Route("create")]
        [Authorize(Roles = "Admin")]
        public IActionResult CreateShoe(Shoe shoe)
        {
            if (shoe == null)
            {
                return BadRequest("Shoe not provided");
            }

            shoe.CreationTime = DateTime.UtcNow;
            shoeRepo.Add(shoe);
            shoeRepo.Save();

            return Content(shoe.Id.ToString());
        }

        [HttpDelete]
        [Route("delete/{id?}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteShoe([FromRoute] int? id)
        {
            if (!id.HasValue)
            {
                return NotFound("Id not provided");
            }

            shoeRepo.Delete(new Shoe() { Id = (int)id });
            shoeRepo.Save();
            return Ok();
        }

        [HttpPut]
        [Route("edit")]
        [Authorize(Roles = "Admin")]
        public IActionResult EditShoe(Shoe shoe)
        {
            if (shoe == null)
            {
                return BadRequest("shoe not provided");
            }

            shoeRepo.Update(shoe);
            shoeRepo.Save();

            return Content(shoe.Id.ToString());
        }

        [NonAction]
        private async Task Initialize()
        {
            string url = "https://api.escuelajs.co/api/v1/products/?categoryId=4";

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

                    shoeRepo.Add(new Shoe()
                    {
                        Title = (string)node["title"],
                        Price = (decimal)node["price"],
                        Description = (string)node["description"],
                        Picture = pictureArray != null ? Convert.ToBase64String(pictureArray) : null,
                        CreationTime = DateTime.SpecifyKind(creationTime, DateTimeKind.Utc),
                        Cathegory = "Automatically"
                    });
                }

                shoeRepo.Save();
            }
            catch (Exception ex)
            {
                logger.LogCritical("Error during initialization: {0}", ex.Message);
            }
        }
    }
}
