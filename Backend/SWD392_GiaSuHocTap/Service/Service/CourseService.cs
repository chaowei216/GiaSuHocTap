using DAO.Model;
using Repository.IRepository;
using Service.IService;
using Common.DTO.Course;
using AutoMapper;

namespace Service.Service
{
    public class CourseService: ICourseService
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IUserCourseRepository _userCourseRepository;
        private readonly IMapper _mapper;

        public CourseService(ICourseRepository CourseRepository, IMapper mapper, IUserCourseRepository userCourseRepository)
        {
            _courseRepository = CourseRepository;
            _mapper = mapper;
            _userCourseRepository = userCourseRepository;
        }

        public async Task<Course> AddCourse(Course entity)
        {
            return await _courseRepository.AddCourse(entity);
        }

        public async Task<UserCourse> AddUserCouse(UserCourse userCourse)
        {
            return await _userCourseRepository.AddNewUserCourse(userCourse);
        }

        public IEnumerable<CourseDTO> GetAllCourses()
        {
            var courses = _courseRepository.GetAllCourses();
            var courseMap = _mapper.Map<List<CourseDTO>>(courses);
            return courseMap;
        }

        public async Task<Course?> GetCourseById(int id)
        {
            return await _courseRepository.GetCourseById(id);
        }
    }
}
