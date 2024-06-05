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
        /// Add new user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task<User> AddNewUser(User user);

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
    }
}
