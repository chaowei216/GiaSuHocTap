using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAO.Model
{
    public class TimeTable
    {
        [Key]
        public int TimeTableId { get; set; }
        [Required]
        public string DayOfWeek { get; set; } = null!;
        [Required]
        public DateTime StartTime { get; set; }
        [Required]
        public DateTime EndTime { get; set; }
        public string Status { get; set; } = null!;
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; } = null!;
        public ICollection<RequestTime> RequestTimes { get; set; } = null!;
    }
}
