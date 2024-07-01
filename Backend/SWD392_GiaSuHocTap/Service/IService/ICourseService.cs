using DAO.Model;
using Common.DTO.Course;

namespace Service.IService
{
    public interface ICourseService
    {
        /// <summary>
        /// Get all course
        /// </summary>
        /// <returns></returns>
        IEnumerable<CourseDTO> GetAllCourses();

        /// <summary>
        /// Get course by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Course?> GetCourseById(int id);

        /// <summary>
        /// Add new course
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        Task<Course> AddCourse(Course course);

        /// <summary>
        /// Add new user course
        /// </summary>
        /// <param name="userCourse"></param>
        /// <returns></returns>
        Task<UserCourse> AddUserCouse(UserCourse userCourse);
    }
}
