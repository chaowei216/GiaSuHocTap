using System.ComponentModel.DataAnnotations;

namespace Common.DTO.News
{
    public class NewsDTO
    {
        public int NewsId { get; set; }
        [Required]
        public string Description { get; set; } = null!;
        [Required]
        public string Title { get; set; } = null!;
        public string Image { get; set; } = null!;
        [Required]
        public DateTime CreateDate { get; set; }
        public string AuthorName { get; set; } = null!;
        public bool Status { get; set; }
    }
}
