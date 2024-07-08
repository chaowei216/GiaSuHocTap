namespace Common.DTO.Request
{
    public class RequestUpdateDTO
    {
        public int TutorId { get; set; }
        public int RequestId { get; set; }
        public bool IsAccepted { get; set; }
        public string LinkMeet { get; set; } = null!;
    }
}
