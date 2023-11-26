namespace ProductsCatalog.Business.Models
{
    public class IdInfo
    {
        public int Id { get; set; }
        public DateTime CreationTime { get; set; }
        public string Cathegory { get; set; }
        public string? Title { get; set; }
        public decimal? Price { get; set; }
        public string? Description { get; set; }
    }
}
