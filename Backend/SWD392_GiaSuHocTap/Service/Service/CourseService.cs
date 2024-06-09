using DAO.Model;
using Repository.IRepository;
using Service.IService;

namespace Service.Service
{
    public class CourseService: ICourseService
    {
        private readonly ICourseRepository _courseRepository;

        public CourseService(ICourseRepository CourseRepository)
        {
            _courseRepository = CourseRepository;
        }

        public async Task<Course> AddCourse(Course entity)
        {
            return await _courseRepository.AddCourse(entity);
        }

        public IEnumerable<Course> GetAllCourses()
        {
            return _courseRepository.GetAllCourses().AsEnumerable();
        }

        public async Task<Course?> GetCourseById(int id)
        {
            return await _courseRepository.GetCourseById(id);
        }
    }
}
