using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Request
{
    public class RequestUserDTO
    {
        public int RequestId { get; set; }
        public string? Location { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double? Price { get; set; }
        public int? Coin { get; set; }
        public string RequestType { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
        public string? LinkMeet { get; set; }
        public string RequestUserName { get; set; } = null!;
        public string ClassName { get; set; } = null!;
        public string CourseName { get; set; } = null!;
        public ICollection<RequestTimeDTO>? Time { get; set; } = new List<RequestTimeDTO>();
        public string RequestStatus { get; set; } = null!;
        public string Fullname { get; set; } = null!;
    }
}
