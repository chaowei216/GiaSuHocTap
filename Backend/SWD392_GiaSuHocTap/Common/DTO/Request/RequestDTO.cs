using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Common.DTO.Request
{
    public class RequestDTO
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
        public ICollection<RequestTimeDTO> RequestTimes { get; set; } = null!;
        public string RequestStatus { get; set; } = null!;
    }
}
