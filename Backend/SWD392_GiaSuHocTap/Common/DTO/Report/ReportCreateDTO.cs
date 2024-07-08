namespace Common.DTO.Report
{
    public class ReportCreateDTO
    {
        public int UserId { get; set; }
        public int TutorId { get; set; }
        public string ReportTitle { get; set; } = null!;
        public string Description { get; set; } = null!;
    }
}
