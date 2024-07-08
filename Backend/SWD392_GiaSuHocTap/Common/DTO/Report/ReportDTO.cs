namespace Common.DTO.Report
{
    public class ReportDTO
    {
        public int ReportId { get; set; }
        public string ReportTitle { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
        public string ParentsEmail { get; set; }
        public string TutorEmail { get; set; }
    }
}
