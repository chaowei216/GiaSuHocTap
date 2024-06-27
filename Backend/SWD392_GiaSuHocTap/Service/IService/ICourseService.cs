using Common.DTO.Course;
using DAO.Model;

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
        Task<bool> DeleteUserCourse(int userId);

        IEnumerable<DeleteUserCourseDTO> GetAllUserCourses(int userId);
    }
}
