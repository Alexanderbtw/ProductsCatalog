using System.ComponentModel.DataAnnotations.Schema;

namespace ProductsCatalog.Business.Models
{
    public class Cloth : IdInfo
    {
        public string? Material { get; set; }
        public string? Size { get; set; }
        public string? Color { get; set; }
    }
}
