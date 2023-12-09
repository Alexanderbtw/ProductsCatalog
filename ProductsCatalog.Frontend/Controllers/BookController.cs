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
    public class BookController : Controller
    {
        private readonly EFRepository<Book, ProductContext> bookRepo;

        public BookController(EFRepository<Book, ProductContext> repo)
        {
            bookRepo = repo;
        }

        [HttpGet]
        [Route("getall")]
        public IActionResult GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string search = "")
        {
            search = search.ToLower();

            var request = bookRepo.GetAllWithoutTracking().Where(p => p.Title.ToLower().Contains(search) || p.Cathegory.ToLower().Contains(search));
            int totalCount = request.Count();

            List<Book> productsInfo = request
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

            Book? bookInfo = bookRepo.GetWithoutTracking(item => item.Id == id.Value);
            if (bookInfo == null)
            {
                return NotFound();
            }

            return new JsonResult(bookInfo);
        }

        [HttpPost]
        [Route("create")]
        [Authorize(Roles = "Admin")]
        public IActionResult CreateBook(Book book)
        {
            if (book == null)
            {
                return BadRequest("Book not provided");
            }

            book.CreationTime = DateTime.UtcNow;
            bookRepo.Add(book);
            bookRepo.Save();

            return Content(book.Id.ToString());
        }

        [HttpDelete]
        [Route("delete/{id?}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteBook([FromRoute] int? id)
        {
            if (!id.HasValue)
            {
                return NotFound("Id not provided");
            }

            bookRepo.Delete(new Book() { Id = (int)id });
            bookRepo.Save();
            return Ok();
        }

        [HttpPut]
        [Route("edit")]
        [Authorize(Roles = "Admin")]
        public IActionResult EditbBook(Book book)
        {
            if (book == null)
            {
                return BadRequest("Book not provided");
            }

            bookRepo.Update(book);
            bookRepo.Save();

            return Content(book.Id.ToString());
        }
    }
}
