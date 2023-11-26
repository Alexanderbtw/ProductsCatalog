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

            List<Cloth> clothesInfo = clothRepo.GetAllWithoutTracking()
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return new JsonResult(new { clothesInfo, totalCount });
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
    }
}
