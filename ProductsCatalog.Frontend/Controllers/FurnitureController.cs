using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductsCatalog.Business.Models;
using ProductsCatalog.DAL;
using ProductsCatalog.DAL.Repositories;

namespace ProductsCatalog.Frontend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class FurnitureController : Controller
    {
        private readonly EFRepository<Furniture, ProductContext> furnitureRepo;

        public FurnitureController(EFRepository<Furniture, ProductContext> repo)
        {
            furnitureRepo = repo;
        }

        [HttpGet]
        [Route("getall")]
        public IActionResult GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string search = "")
        {
            search = search.ToLower();

            var request = furnitureRepo.GetAllWithoutTracking().Where(p => p.Title.ToLower().Contains(search) || p.Cathegory.ToLower().Contains(search));
            int totalCount = request.Count();

            List<Furniture> productsInfo = request
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

            Furniture? furnitureInfo = furnitureRepo.GetWithoutTracking(item => item.Id == id.Value);
            if (furnitureInfo == null)
            {
                return NotFound();
            }

            return new JsonResult(furnitureInfo);
        }

        [HttpPost]
        [Route("create")]
        [Authorize(Roles = "Admin")]
        public IActionResult CreateFurniture(Furniture furniture)
        {
            if (furniture == null)
            {
                return BadRequest("Furniture not provided");
            }

            furniture.CreationTime = DateTime.UtcNow;
            furnitureRepo.Add(furniture);
            furnitureRepo.Save();

            return Content(furniture.Id.ToString());
        }

        [HttpDelete]
        [Route("delete/{id?}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteFurniture([FromRoute] int? id)
        {
            if (!id.HasValue)
            {
                return NotFound("Id not provided");
            }

            furnitureRepo.Delete(new Furniture() { Id = (int)id });
            furnitureRepo.Save();
            return Ok();
        }

        [HttpPut]
        [Route("edit")]
        [Authorize(Roles = "Admin")]
        public IActionResult EditbFurniture(Furniture furniture)
        {
            if (furniture == null)
            {
                return BadRequest("Furniture not provided");
            }

            furnitureRepo.Update(furniture);
            furnitureRepo.Save();

            return Content(furniture.Id.ToString());
        }
    }
}
