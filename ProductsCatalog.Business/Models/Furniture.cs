namespace ProductsCatalog.Business.Models
{
    public class Furniture : IdInfo
    {
        public string? Materials { get; set; }
        public float? Width { get; set; }
        public float? Depth { get; set; }
        public float? Height { get; set; }
        public string? Color { get; set; }
        public string? Design { get; set; }
        public string? AdditionalFunctions { get; set; }
    }
}
