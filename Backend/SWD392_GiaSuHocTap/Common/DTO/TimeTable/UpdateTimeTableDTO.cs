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
        public int TutorId { get; set; }
        public List<int> Subjects { get; set; } = null!;
        public List<int> Classes { get; set; } = null!;
        public bool IsOfflineTeaching { get; set; } = false;
        public List<List<string>> DayOfWeekOnline { get; set; } = null!;
        public List<List<string>>? DayOfWeekOffline { get; set; }
    }
}
