namespace Common.DTO.Request
{
    public class RequestOfflineCreateDTO
    {
        public int UserId { get; set; }
        public int TutorId { get; set; }
        public string Location { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double Price { get; set; }
        public int CourseId { get; set; }
        public int ClassId { get; set; }
    }
}
