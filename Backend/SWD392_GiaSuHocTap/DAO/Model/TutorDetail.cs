using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAO.Model
{
    public class TutorDetail
    {
        [Key]
        public int TutorDetailId {  get; set; }
        [Required]
        public string Job { get; set; } = null!;
        [Required]
        public string Major { get; set; } = null!;
        [Required]
        public string Qualification { get; set; } = null!;
        [Required]
        public string CertificateImage { get; set; } = null!;
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; } = null!;
    }
}
