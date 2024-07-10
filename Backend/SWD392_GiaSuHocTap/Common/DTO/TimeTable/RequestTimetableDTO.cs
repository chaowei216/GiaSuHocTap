using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.TimeTable
{
    public class RequestTimetableDTO
    {
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
        public string Fullname { get; set; } = null!;
        public int TutorId { get; set; }
    }
}
