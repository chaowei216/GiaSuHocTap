using DAO.DAO;
using DAO.Model;
using Repository.IRepository;

namespace Repository.Repository
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly IGenericDAO<Notification> _notificationDAO;

        public NotificationRepository(IGenericDAO<Notification> notificationDAO)
        {
            _notificationDAO = notificationDAO;
        }

        public async Task<Notification> AddNewNotification(Notification notification)
        {
            return await _notificationDAO.AddAsync(notification);
        }

        public IEnumerable<Notification> GetAllNotifications()
        {
            return _notificationDAO.GetAll().AsEnumerable();
        }

        public async Task<Notification?> GetNotificationById(int id)
        {
            return await _notificationDAO.GetByIdAsync(id);
        }

        public async Task<Notification> UpdateNotification(Notification notification)
        {
            return await _notificationDAO.UpdateAsync(notification);
        }
    }
}
