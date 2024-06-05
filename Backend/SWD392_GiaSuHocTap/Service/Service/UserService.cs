using DAO.Model;
using Repository.IRepository;
using Service.IService;

namespace Service.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<TutorDetail> AddNewTutorDetail(TutorDetail tutorDetail)
        {
            return await _userRepository.AddNewTutorDetail(tutorDetail);
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _userRepository.GetAllUsers();
        }

        public async Task<User?> GetUserById(int id)
        {
            return await _userRepository.GetUserById(id);
        }

        public async Task<TutorDetail> UpdateTutorDetail(TutorDetail tutorDetail)
        {
            return await _userRepository.UpdateTutorDetail(tutorDetail);
        }

        public async Task<User> UpdateUser(User user)
        {
            return await _userRepository.UpdateUser(user);
        }
    }
}
