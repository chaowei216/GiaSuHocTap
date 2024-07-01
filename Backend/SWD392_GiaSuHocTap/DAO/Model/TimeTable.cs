using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace DAO.Model
{
    public class TimeTable
    {
        [Key]
        public int TimeTableId { get; set; }
        [Required]
        public string DayOfWeek { get; set; } = null!;
        [AllowNull]
        public string? StartTime { get; set; }
        [AllowNull]
        public string? EndTime { get; set; }
        [AllowNull]
        public string? Period { get; set; } = null!;
        public string Status { get; set; } = null!;
        public string LearningType { get; set; } = null!;
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; } = null!;
        public ICollection<RequestTime> RequestTimes { get; set; } = null!;
    }
}
