namespace ProductsCatalog.Business.Models
{
    public class Shoe : IdInfo
    {
        public string? Color { get; set; }
        public string? Season { get; set; }
        public string? Size { get; set; }
        public string? Material { get; set; }
        public int? Insole { get; set; }
        public string? Sole { get; set; }
    }
}
