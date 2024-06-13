using Common.DTO;
using Common.DTO.Query;
using DAO.DAO;
using DAO.Model;
using Repository.IRepository;

namespace Repository.Repository
{
    public class CourseRepository : ICourseRepository
    {
        private readonly IGenericDAO<Course> _courseDAO;

        public CourseRepository(IGenericDAO<Course> courseDAO)
        {
            _courseDAO = courseDAO;
        }

        public async Task<Course> AddCourse(Course course)
        {
            return await _courseDAO.AddAsync(course);
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
