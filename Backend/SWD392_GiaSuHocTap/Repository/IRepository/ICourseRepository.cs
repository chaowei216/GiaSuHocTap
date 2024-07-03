using Common.DTO.Query;
using Common.DTO;
using DAO.Model;

namespace Repository.IRepository
{
    public interface ICourseRepository
    {
        /// <summary>
        /// Get all time tables
        /// </summary>
        /// <returns></returns>
        IEnumerable<Course> GetAllCourses();

        /// <summary>
        /// Get time table by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Course?> GetCourseById(int id);

        /// <summary>
        /// Add new role
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        Task<Course> AddCourse(Course course);

        /// <summary>
        /// Get course list with pagination
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PagedList<Course> GetPagedCourseList(CourseParameters parameters);

        /// <summary>
        /// Add new user course
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        Task<UserCourse> AddNewUserCourse(UserCourse userCourse);

        /// <summary>
        /// Delete course which tutor teach
        /// </summary>
        /// <param name="userCourse"></param>
        /// <returns></returns>
        Task<bool> DeleteUserCourse(UserCourse userCourse);

        /// <summary>
        /// Get all user course by user Id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        IEnumerable<UserCourse> GetUserCourseByUserId(int userId);
    }
}
