using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Request
{
    public class RequestOnlineUpdateDTO
    {
        public int TutorId { get; set; }
        public int RequestId { get; set; }
        public bool IsAccepted { get; set; }
        public string LinkMeet { get; set; } = null!;
    }
}
