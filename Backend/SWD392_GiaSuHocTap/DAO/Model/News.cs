using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAO.Model
{
    public class News
    {
        [Key]
        public int NewsId { get; set; }
        [Required]
        public string Description { get; set; } = null!;
        [Required]
        public string Title { get; set; } = null!;
        public string Image { get; set; } = null!;
        [Required]
        public DateTime CreateDate { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; } = null!;
        public bool Status { get; set; }
    }
}
