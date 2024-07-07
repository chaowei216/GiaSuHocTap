namespace Common.DTO.Query
{
    public class TutorParameters : QueryStringParameters
    {
        public string? Name { get; set; }
        public int? ClassId { get; set; }
        public int? CourseId { get; set; }
    }
}
