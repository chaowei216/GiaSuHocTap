using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAO.Model
{
    public class Report
    {
        [Key]
        public int ReportId { get; set; }
        public string ReportTitle { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
        public bool Status { get; set; }
        public int FromId { get; set; }
        public int ToId { get; set; }
        [ForeignKey("FromId")]
        public User From { get; set; } = null!;
        [ForeignKey("ToId")]
        public User To { get; set; } = null!;
    }
}
