using DAO.Model;
using Repository.IRepository;
using Service.IService;

namespace Service.Service
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepository;

        public NotificationService(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        public async Task<Notification> AddNewNotification(Notification notification)
        {
            return await _notificationRepository.AddNewNotification(notification);
        }

        public async Task<UserNotification> AddNewUserNotification(UserNotification userNotification)
        {
            return await _notificationRepository.AddNewUserNotification(userNotification);
        }

        public IEnumerable<Notification> GetAllNotifications()
        {
            return _notificationRepository.GetAllNotifications().AsEnumerable();
        }

        public async Task<Notification?> GetNotificationById(int id)
        {
            return await _notificationRepository.GetNotificationById(id);
        }

        public async Task<Notification> UpdateNotification(Notification notification)
        {
            return await _notificationRepository.UpdateNotification(notification);
        }
    }
}
