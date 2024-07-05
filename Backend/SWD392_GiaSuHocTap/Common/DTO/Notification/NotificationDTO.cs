namespace Common.DTO.Notification
{
    public class NotificationDTO
    {
        public int NotificationId { get; set; }
        public string Description { get; set; } = null!;
        public string NotificationType { get; set; } = null!;
        public DateTime CreatedTime { get; set; }
        public bool Status { get; set; }
    }
}
