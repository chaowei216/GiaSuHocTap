﻿using Common.Constant.Notification;
using Common.DTO;
using Common.DTO.Query;
using DAO.DAO;
using DAO.Model;
using Microsoft.EntityFrameworkCore;
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

        public async Task<bool> DeleteNotification(int id)
        {
            var notification = _notificationDAO.GetByCondition(p => p.NotificationId == id).FirstOrDefault();

            if (notification != null)
            {
                await _notificationDAO.DeleteAsync(notification);

                return true;
            }

            return false;
        }

        public IEnumerable<Notification> GetAllNotifications()
        {
            return _notificationDAO.GetAll().AsEnumerable();
        }

        public PagedList<Notification> GetAllSystemNotifications(NotificationParameters parameters)
        {
            return PagedList<Notification>.ToPagedList(_notificationDAO.GetAll().Where(p => p.NotificationType == NotificationType.System).Include(p => p.UserNotification).ThenInclude(p => p.User), parameters.PageNumber, parameters.PageSize);
        }

        public async Task<Notification?> GetNotificationById(int id)
        {
            return await _notificationDAO.GetByIdAsync(id);
        }

        public IEnumerable<Notification> GetNotificationsOfUser(int userId)
        {
            var ntfIdOfUser = _userNotificationDAO.GetAll().Where(p => p.UserId == userId).Select(p => p.NotificationId).ToList();

            return _notificationDAO.GetAll().Where(p => ntfIdOfUser.Contains(p.NotificationId) || p.NotificationType == NotificationType.System).ToList();
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
