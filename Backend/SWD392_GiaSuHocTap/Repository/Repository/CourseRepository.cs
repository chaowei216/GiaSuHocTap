using Common.DTO;
using Common.DTO.Query;
using Common.DTO.User;
using DAO.DAO;
using DAO.Model;
using Repository.IRepository;

namespace Repository.Repository
{
    public class CourseRepository : ICourseRepository
    {
        private readonly IGenericDAO<Course> _courseDAO;
        private readonly IGenericDAO<UserCourse> _userCourseDAO;

        public CourseRepository(IGenericDAO<Course> courseDAO, IGenericDAO<UserCourse> userCourseDAO)
        {
            _courseDAO = courseDAO;
            _userCourseDAO = userCourseDAO;
        }

        public async Task<Course> AddCourse(Course course)
        {
            return await _courseDAO.AddAsync(course);
        }

        public async Task<bool> DeleteUserCourse(UserCourse userCourse)
        {
            return await _userCourseDAO.DeleteAsync(userCourse);
        }
        public IEnumerable<UserCourse> GetUserCourseByUserId(int userId)
        {
            return _userCourseDAO.GetAll().Where(d => d.UserId == userId).AsEnumerable();
        }

        public IEnumerable<Course> GetAllCourses()
        {
            return _courseDAO.GetAll().AsEnumerable();
        }

        public async Task<Course?> GetCourseById(int id)
        {
            return await _courseDAO.GetByIdAsync(id);
        }

        public PagedList<Course> GetPagedCourseList(CourseParameters parameters)
        {
            return PagedList<Course>.ToPagedList(_courseDAO.GetAll(), parameters.PageNumber, parameters.PageSize);
        }
    }
}
