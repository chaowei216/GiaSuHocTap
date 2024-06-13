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
        /// Get user by id
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        IEnumerable<User>? GetUserByStatus();
    }
}
