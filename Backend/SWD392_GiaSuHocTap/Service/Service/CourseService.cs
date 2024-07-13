using DAO.Model;
using Repository.IRepository;
using Service.IService;
using Common.DTO.Course;
using AutoMapper;
using Repository.Repository;

namespace Service.Service
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IMapper _mapper;

        public CourseService(ICourseRepository CourseRepository, IMapper mapper)
        {
            _courseRepository = CourseRepository;
            _mapper = mapper;
        }

        public async Task<Course> AddCourse(Course entity)
        {
            return await _courseRepository.AddCourse(entity);
        }

        public async Task<UserCourse> AddUserCouse(UserCourse userCourse)
        {
            return await _courseRepository.AddNewUserCourse(userCourse);
        }

        public IEnumerable<CourseFullDTO> GetAllCourses()
        {
            var courses = _courseRepository.GetAllCourses();
            var courseMap = _mapper.Map<List<CourseFullDTO>>(courses);
            return courseMap;
        }

        public async Task<Course?> GetCourseById(int id)
        {
            return await _courseRepository.GetCourseById(id);
        }
        public async Task<bool> DeleteUserCourse(int userId)
        {
            try
            {
                var userCourses = _courseRepository.GetUserCourseByUserId(userId).ToList();
                await Task.WhenAll(userCourses.Select(c => _courseRepository.DeleteUserCourse(c)));
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public IEnumerable<DeleteUserCourseDTO> GetAllUserCourses(int userId)
        {
            var userCourse = _courseRepository.GetUserCourseByUserId(userId);
            var userCourseMap = _mapper.Map<List<DeleteUserCourseDTO>>(userCourse);
            return userCourseMap;
        }

        public async Task<UserCourse> AddNewUserCourse(UserCourse userCourse)
        {
            return await _courseRepository.AddNewUserCourse(userCourse);
        }

        public async Task<UserCourse?> GetUserClassByUserIdAndCourseId(int userId, int courseId)
        {
            return await _courseRepository.GetUserClassByUserIdAndCourseId(userId, courseId);
        }
    }
}
