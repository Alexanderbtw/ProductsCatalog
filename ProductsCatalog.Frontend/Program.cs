namespace ProductsCatalog.Frontend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllersWithViews();
            
            var app = builder.Build();

            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseWebpackDevMiddleware();
                app.UseHsts();
            }

            app.UseStaticFiles();
            app.UseRouting();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.MapControllerRoute(
                name: "api",
                pattern: "api/{controller=Default}/{action=Index}/{id?}");

            app.MapFallbackToController("Index", "Home");

            app.Run();
        }
    }
}
