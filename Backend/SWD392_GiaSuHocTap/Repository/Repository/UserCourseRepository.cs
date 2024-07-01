using DAO.DAO;
using DAO.Model;
using Repository.IRepository;

namespace Repository.Repository
{
    public class UserCourseRepository : IUserCourseRepository
    {
        private readonly IGenericDAO<UserCourse> _userCourseDAO;

        public UserCourseRepository(IGenericDAO<UserCourse> userCourseDAO)
        {
            _userCourseDAO = userCourseDAO;
        }

        public async Task<UserCourse> AddNewUserCourse(UserCourse course)
        {
            return await _userCourseDAO.AddAsync(course);
        }
    }
}
