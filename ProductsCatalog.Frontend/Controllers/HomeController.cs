using Microsoft.AspNetCore.Mvc;

namespace ProductsCatalog.Frontend.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
