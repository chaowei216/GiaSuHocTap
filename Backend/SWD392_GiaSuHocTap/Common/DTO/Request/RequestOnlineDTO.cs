using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Request
{
    public class RequestOnlineDTO
    {
        public string Description { get; set; } = null!;
        public int Coin { get; set; }
        public DateTime CretaeDate { get; set; }
        public int CourseId { get; set; }
        public int ClassId { get; set; }
        public int FromId { get; set; }
        public int TimeTableId { get; set; }
    }
}
