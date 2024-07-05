using AutoMapper;
using Common.DTO.Notification;
using DAO.Model;
using Repository.IRepository;
using Service.IService;

namespace Service.Service
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly IMapper _mapper;

        public NotificationService(INotificationRepository notificationRepository,
                                   IMapper mapper)
        {
            _notificationRepository = notificationRepository;
            _mapper = mapper;
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

        public IEnumerable<NotificationDTO> GetAllNotificationsOfUser(int userId)
        {
            var ntfOfUser = _notificationRepository.GetNotificationsOfUser(userId);

            var mappedResponse = _mapper.Map<List<NotificationDTO>>(ntfOfUser);

            return mappedResponse;
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
