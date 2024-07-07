using Common.DTO.Query;
using Common.DTO;
using DAO.Model;

namespace Repository.IRepository
{
    public interface INotificationRepository
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

        /// <summary>
        /// Get notification list with pagination
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PagedList<Notification> GetPagedNotificationList(NotificationParameters parameters);

        /// <summary>
        /// Add new user notification
        /// </summary>
        /// <param name="userNotification"></param>
        /// <returns></returns>
        Task<UserNotification> AddNewUserNotification(UserNotification userNotification);

        /// <summary>
        /// Get notifications of user by id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        IEnumerable<Notification> GetNotificationsOfUser(int userId);

        /// <summary>
        /// Get all system notifications
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PagedList<Notification> GetAllSystemNotifications(NotificationParameters parameters);

        /// <summary>
        /// Delete notification
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<bool> DeleteNotification(int id);
    }
}
