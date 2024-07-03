using Common.DTO;
using Common.DTO.Query;
using DAO.DAO;
using DAO.Model;
using Repository.IRepository;

namespace Repository.Repository
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly IGenericDAO<Notification> _notificationDAO;
        private readonly IGenericDAO<UserNotification> _userNotificationDAO;

        public NotificationRepository(IGenericDAO<Notification> notificationDAO, IGenericDAO<UserNotification> userNotificationDAO)
        {
            _notificationDAO = notificationDAO;
            _userNotificationDAO = userNotificationDAO;
        }

        public async Task<Notification> AddNewNotification(Notification notification)
        {
            return await _notificationDAO.AddAsync(notification);
        }

        public async Task<UserNotification> AddNewUserNotification(UserNotification userNotification)
        {
            return await _userNotificationDAO.AddAsync(userNotification);
        }

        public IEnumerable<Notification> GetAllNotifications()
        {
            return _notificationDAO.GetAll().AsEnumerable();
        }

        public async Task<Notification?> GetNotificationById(int id)
        {
            return await _notificationDAO.GetByIdAsync(id);
        }

        public PagedList<Notification> GetPagedNotificationList(NotificationParameters parameters)
        {
            return PagedList<Notification>.ToPagedList(_notificationDAO.GetAll(), parameters.PageNumber, parameters.PageSize);
        }

        public async Task<Notification> UpdateNotification(Notification notification)
        {
            return await _notificationDAO.UpdateAsync(notification);
        }
    }
}
