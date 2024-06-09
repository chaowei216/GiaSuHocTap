using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAO.Model
{
    public class Feedback
    {
        [Key]
        public int FeedbackId { get; set; }
        [Required]
        public string Description { get; set; } = null!;
        [Required]
        public int Rating { get; set; }
        public int FromId { get; set; }
        public int ToId { get; set; }
        [ForeignKey("FromId")]
        public User From { get; set; } = null!;
        [ForeignKey("ToId")]
        public User To { get; set; } = null!;

    }
}
