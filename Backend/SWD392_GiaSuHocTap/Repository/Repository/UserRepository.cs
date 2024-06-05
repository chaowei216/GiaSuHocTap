using DAO.DAO;
using DAO.Model;
using Repository.IRepository;

namespace Repository.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IGenericDAO<User> _userDAO;
        private readonly IGenericDAO<TutorDetail> _tutorDetailDAO;

        public UserRepository(IGenericDAO<User> userDAO, 
                              IGenericDAO<TutorDetail> tutorDetailDAO)
        {
            _userDAO = userDAO;
            _tutorDetailDAO = tutorDetailDAO;
        }

        public async Task<TutorDetail> AddNewTutorDetail(TutorDetail tutorDetail)
        {
            return await _tutorDetailDAO.AddAsync(tutorDetail);
        }

        public async Task<User> AddNewUser(User user)
        {
            return await _userDAO.AddAsync(user);
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _userDAO.GetAll().AsEnumerable();
        }

        public async Task<User?> GetUserById(int id)
        {
            return await _userDAO.GetByIdAsync(id);
        }

        public async Task<TutorDetail> UpdateTutorDetail(TutorDetail tutorDetail)
        {
            return await _tutorDetailDAO.UpdateAsync(tutorDetail);
        }

        public async Task<User> UpdateUser(User user)
        {
            return await _userDAO.UpdateAsync(user);
        }
    }
}
