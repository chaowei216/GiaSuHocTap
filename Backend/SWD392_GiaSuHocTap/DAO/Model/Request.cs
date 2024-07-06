using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAO.Model
{
    public class Request
    {
        [Key]
        public int RequestId { get; set; }
        public string? Location { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double? Price { get; set; }
        public int? Coin { get; set; }
        public string RequestType { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
        public string Status { get; set; } = null!;
        public string? LinkMeet { get; set; }
        public int CourseId { get; set; }
        [ForeignKey("CourseId")]
        public Course Course { get; set; } = null!;
        public int FromId { get; set; }
        [ForeignKey("FromId")]
        public User From { get; set; } = null!;
        public ICollection<RequestTime> RequestTimes { get; set; } = null!;
        public int ClassId { get; set; }
        [ForeignKey("ClassId")]
        public Class Class { get; set; } = null!;
    }
}
