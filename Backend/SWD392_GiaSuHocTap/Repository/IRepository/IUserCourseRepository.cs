using DAO.Model;

namespace Repository.IRepository
{
    public interface IUserCourseRepository
    {
        /// <summary>
        /// Add new user course
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        Task<UserCourse> AddNewUserCourse(UserCourse course);
    }
}
