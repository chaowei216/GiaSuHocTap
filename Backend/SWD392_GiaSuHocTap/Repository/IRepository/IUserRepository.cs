using Common.DTO;
using Common.DTO.Query;
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
        IEnumerable<User> GetTutorTeachOnline(UserParameters parameters);

        /// <summary>
        /// Get tutor who teach online
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        IEnumerable<User> GetTutorTeachOffline(UserParameters parameters);
        IEnumerable<User>? GetUserByStatus();      
    }
}
