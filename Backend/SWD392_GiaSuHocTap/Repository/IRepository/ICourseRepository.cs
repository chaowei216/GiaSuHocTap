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
    }
}
