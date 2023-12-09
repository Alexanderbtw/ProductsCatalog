using System.ComponentModel.DataAnnotations.Schema;

namespace ProductsCatalog.Business.Models
{
    public class Device : IdInfo
    {
        public string? Manufacturer { get; set; }
        public string? CPU { get; set; }
        public string? GPU { get; set; }
        public string? Camera { get; set; }
        public string? ScreenType { get; set; }
    }
}
