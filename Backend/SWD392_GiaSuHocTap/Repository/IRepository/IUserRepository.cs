﻿using Common.DTO;
using Common.DTO.Query;
using Common.DTO.User;
using Common.Enum;
using DAO.Model;

namespace Repository.IRepository
{
    public interface IUserRepository
    {
        /// <summary>
        /// Get all users
        /// </summary>
        /// <returns></returns>
        IEnumerable<User> GetAllUsers();

        /// <summary>
        /// Get user by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<User?> GetUserById(int id);

        /// <summary>
        /// Add new parent
        /// </summary>
        /// <param name="parent"></param>
        /// <returns></returns>
        Task<User> AddNewParent(User parent);

        /// <summary>
        /// Add new tutor
        /// </summary>
        /// <param name="tutor"></param>
        /// <returns></returns>
        Task<User> AddNewTutor(User tutor);

        /// <summary>
        /// Update user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task<User> UpdateUser(User user);

        /// <summary>
        /// Add new tutor detail
        /// </summary>
        /// <param name="tutorDetail"></param>
        /// <returns></returns>
        Task<TutorDetail> AddNewTutorDetail(TutorDetail tutorDetail);

        /// <summary>
        /// Update tutor detail
        /// </summary>
        /// <param name="tutorDetail"></param>
        /// <returns></returns>
        Task<TutorDetail> UpdateTutorDetail(TutorDetail tutorDetail);

        /// <summary>
        /// Get user by email address
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        User? GetUserByEmail(string email);

        /// <summary>
        /// Get user by email address
        /// </summary>
        /// <param name="phone"></param>
        /// <returns></returns>
        User? GetUserByPhone(string phone);

        /// <summary>
        /// Get user list with pagination
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PagedList<User> GetPagedUserList(UserParameters parameters);

        /// <summary>
        /// Get pending user list with pagination
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PagedList<User> GetPagedPendingUserList(UserParameters parameters);

        /// <summary>
        /// Get active user list with pagination
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PagedList<User> GetPagedActiveUserList(UserParameters parameters);

        /// <summary>
        /// Get user by status
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        IEnumerable<User>? GetUserByStatus(UserStatusEnum status);

        /// <summary>
        /// Get tutor who teach online
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        IEnumerable<User> GetTutorTeachOnline(TutorParameters parameters);

        /// <summary>
        /// Get tutor who teach online
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        IEnumerable<User> GetTutorTeachOffline(TutorParameters parameters);

        /// <summary>
        /// Get user by email include all infor
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        User? GetUserByEmailInclude(string email);

        /// <summary>
        /// Get top tutor by feedback
        /// </summary>
        /// <param name="feedbacks"></param>
        /// <returns></returns>
        IEnumerable<User> GetTopTutorByFeedBack(IEnumerable<Feedback> feedbacks);

        /// <summary>
        /// Get tutor detail by tutorId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<TutorDetail?> GetTutorDetailByTutorId(int id);

        /// <summary>
        /// Get user list with pagination
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PagedList<User> GetPagedTutorList(UserParameters parameters);

        /// <summary>
        /// Add new moderator
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task<User> AddNewModerator(User user);
    }
}
