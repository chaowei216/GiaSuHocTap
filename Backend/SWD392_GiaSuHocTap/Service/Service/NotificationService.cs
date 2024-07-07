using AutoMapper;
using Common.Constant.Notification;
using Common.DTO;
using Common.DTO.Notification;
using Common.DTO.Query;
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

        public async Task<NotificationDTO?> AddNewSystemNotification(NotificationCreateDTO notification)
        {

            var createNotification = await _notificationRepository.AddNewNotification(new Notification()
            {
                CreatedTime = DateTime.Now,
                Description = notification.Description,
                NotificationType = NotificationType.System,
            });

            if (createNotification != null)
            {

                await _notificationRepository.AddNewUserNotification(new UserNotification()
                {
                    UserId = notification.UserId,
                    NotificationId = createNotification.NotificationId
                });

                var mappedResponse = _mapper.Map<NotificationDTO>(createNotification);

                return mappedResponse;
            }

            return null;
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

        public PaginationResponseDTO<NotificationDTO> GetAllSystemNotifications(NotificationParameters parameters)
        {
            var notifications = _notificationRepository.GetAllSystemNotifications(parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<NotificationDTO>>(notifications);
            mappedResponse.Data = _mapper.Map<List<NotificationDTO>>(notifications);

            return mappedResponse;
        }

        public async Task<Notification?> GetNotificationById(int id)
        {
            return await _notificationRepository.GetNotificationById(id);
        }

        public async Task<NotificationDTO?> UpdateNotification(int id, NotificationUpdateDTO notification)
        {
            var notify = await _notificationRepository.GetNotificationById(id);
            if (notify != null && notify.NotificationType == NotificationType.System)
            {
                notify.Description = notification.Description;
                notify.CreatedTime = DateTime.Now;
                var updateNotify = await _notificationRepository.UpdateNotification(notify);

                var mappedResponse = _mapper.Map<NotificationDTO>(updateNotify);

                return mappedResponse;
            }

            return null;
        }
    }
}
