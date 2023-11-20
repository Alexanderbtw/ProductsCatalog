using Microsoft.AspNetCore.Mvc;
using ProductsCatalog.Business.Models;

namespace ProductsCatalog.Frontend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClothController : Controller
    {
        [HttpGet]
        [Route("getall")]
        public IActionResult GetAll()
        {
            Cloth sneakers = new()
            {
                Id = 3,
                Title = "Mickle Jordan",
                Price = 1010,
                Description = "Duck",
                CreationTime = DateTime.Now,
                Color = "Red",
                Material = "Eco",
                Size = "44"
            };
            Cloth shirt = new()
            {
                Id = 4,
                CreationTime = DateTime.UtcNow,
                Price = 1000,
                Description = "Not",
                Color = "black",
                Material = "cotton",
                Size = "L",
                Title = "Shirt"
            };
            List<Cloth> clothesInfo = new List<Cloth>() { sneakers, shirt };
            return new JsonResult(clothesInfo);
        }

        [HttpGet]
        [Route("get/{id?}")]
        public IActionResult GetSingle([FromRoute] int? id)
        {
            if (!id.HasValue)
            {
                return NotFound("Id not provided");
            }

            Cloth clothInfo = new()
            {
                Id = 5,
                Title = "Dunk Travis",
                Price = 1110,
                Description = "HAHA",
                CreationTime = DateTime.Now,
                Color = "Blue",
                Material = "Eco",
                Size = "47"
            };

            return new JsonResult(clothInfo);
        }
    }
}
