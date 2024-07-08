namespace Common.DTO.Query
{
    public class ReportParameters : QueryStringParameters
    {
        public string? FromEmail { get; set; }
        public string? ToEmail { get; set; }
    }
}
