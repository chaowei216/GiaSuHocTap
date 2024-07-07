using Common.DTO;
using Common.DTO.Notification;
using Common.DTO.Query;
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
        /// <param name="id"></param>
        /// <param name="notification"></param>
        /// <returns></returns>
        Task<NotificationDTO?> UpdateNotification(int id, NotificationUpdateDTO notification);

        /// <summary>
        /// Add new user notification
        /// </summary>
        /// <param name="userNotification"></param>
        /// <returns></returns>
        Task<UserNotification> AddNewUserNotification(UserNotification userNotification);

        /// <summary>
        /// Get all notifications by user id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        IEnumerable<NotificationDTO> GetAllNotificationsOfUser(int userId);

        /// <summary>
        /// Create new system notification
        /// </summary>
        /// <param name="notification"></param>
        /// <returns></returns>
        Task<NotificationDTO?> AddNewSystemNotification(NotificationCreateDTO notification);

        /// <summary>
        /// Get all system notifications
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PaginationResponseDTO<NotificationDTO> GetAllSystemNotifications(NotificationParameters parameters);

        Task<bool> DeleteNotification(int id);
    }
}
