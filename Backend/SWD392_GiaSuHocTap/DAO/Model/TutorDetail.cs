using Common.Enum;
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
        public List<string> CertificateImage { get; set; } = null!;
        public bool TeachingOnline { get; set; }
        public bool TeachingOffline { get; set; }
        public int RentHour { get; set; }
        public int NumberOfRent { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; } = null!;
    }
}
