using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAO.Model
{
    public class RequestTime
    {
        public int TimeTableId { get; set; }
        public int RequestId { get; set; }
        public bool IsAccepted { get; set; }
        public string Status { get; set; } = null!;
        public Request Request { get; set; } = null!;
        public TimeTable TimeTable { get; set; } = null!;
    }
}
