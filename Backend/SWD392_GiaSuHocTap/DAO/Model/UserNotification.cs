using System.ComponentModel.DataAnnotations.Schema;

namespace DAO.Model
{
    public class UserNotification
    {
        public int UsertId { get; set; }    
        public int NotificationId { get; set; }
        public User User { get; set; } = null!;
        public Notification Notification { get; set; } = null!;
    }
}
