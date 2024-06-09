using System.ComponentModel.DataAnnotations;

namespace DAO.Model
{
    public class Notification
    {
        [Key]
        public int NotificationId { get; set; }
        public string Description { get; set; } = null!;
        public string NotificationType { get; set; } = null!;
        public bool Status { get; set; }
        public ICollection<UserNotification> UserNotification { get; set; } = null!;
    }
}
