using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ProductsCatalog.Frontend.Controllers
{
    public class AuthController : Controller
    {
        //[HttpGet("Auth")]
        //public async Task Authentificate()
        //{
        //    await HttpContext.SignInAsync(User);
        //}

        [HttpGet("IsAuth")]
        public IActionResult IsAuthentificated()
        {
            return User.Identity.IsAuthenticated ? Ok() : Unauthorized();
        }

        //[HttpGet("Logout")]
        //public void Logout()
        //{
        //    HttpContext.SignOutAsync();
        //}

        [HttpGet("Details")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetDetails()
        {
            var userIdentity = (ClaimsIdentity)User.Identity;
            var claims = userIdentity.Claims;
            var roles = claims.Where(c => c.Type == ClaimTypes.Role).Select(r => r.Value).ToArray();

            var details = new {Username = User.Identity.Name, Roles = roles};
            return new JsonResult(details);
        }
    }
}
