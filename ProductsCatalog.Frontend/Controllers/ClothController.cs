using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductsCatalog.Business.Models;
using ProductsCatalog.DAL;
using ProductsCatalog.DAL.Repositories;

namespace ProductsCatalog.Frontend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClothController : Controller
    {
        private readonly EFRepository<Cloth, ProductContext> clothRepo;

        public ClothController(EFRepository<Cloth, ProductContext> repo)
        {
            clothRepo = repo;
        }

        [HttpGet]
        [Route("getall")]
        public IActionResult GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            int totalCount = clothRepo.GetAll().Count();

            List<Cloth> productsInfo = clothRepo.GetAllWithoutTracking()
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
    }
}
