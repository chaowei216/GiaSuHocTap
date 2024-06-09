using DAO.Model;

namespace Service.IService
{
    public interface INotificationService
    {
        /// <summary>
        /// Get all Notifications
        /// </summary>
        /// <returns></returns>
        IEnumerable<Notification> GetAllNotifications();

        /// <summary>
        /// Get notification by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Notification?> GetNotificationById(int id);

        /// <summary>
        /// Add new notification
        /// </summary>
        /// <param name="notification"></param>
        /// <returns></returns>
        Task<Notification> AddNewNotification(Notification notification);

        /// <summary>
        /// Update notification
        /// </summary>
        /// <param name="notification"></param>
        /// <returns></returns>
        Task<Notification> UpdateNotification(Notification notification);
    }
}
