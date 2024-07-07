namespace Common.DTO.Notification
{
    public class NotificationCreateDTO
    {
        public int UserId { get; set; }
        public string Description { get; set; } = null!;
    }
}
