using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.TimeTable
{
    public class UpdateTimeTableDTO
    {
        public string DayOfWeek { get; set; } = null!;
        [AllowNull]
        public string? StartTime { get; set; }
        [AllowNull]
        public string? EndTime { get; set; }
        [AllowNull]
        public string? Period { get; set; } = null!;
    }
}
