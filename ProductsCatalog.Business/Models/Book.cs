namespace ProductsCatalog.Business.Models
{
    public class Book : IdInfo
    {
        public string? Author { get; set; }
        public int? AgeRating { get; set; }
        public string? PublishingHouse { get; set; }
    }
}
