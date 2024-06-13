using Common.DTO;
using Common.DTO.Query;
using Common.Enum;
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

        public async Task<User> AddNewParent(User parent)
        {
            return await _userDAO.AddAsync(parent);
        }

        public async Task<User> AddNewTutor(User tutor)
        {
            return await _userDAO.AddAsync(tutor);
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _userDAO.GetAll().AsEnumerable();
        }

        public User? GetUserByEmail(string email)
        {
            return _userDAO.GetByCondition(u => u.Email == email).FirstOrDefault();
        }

        public User? GetUserByPhone(string phone)
        {
            return _userDAO.GetByCondition(u => u.Phonenumber == phone).FirstOrDefault();
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

        public PagedList<User> GetPagedUserList(UserParameters parameters)
        {
            return PagedList<User>.ToPagedList(_userDAO.GetAll(), parameters.PageNumber, parameters.PageSize);
        }

        public IEnumerable<User>? GetUserByStatus()
        {
            return _userDAO.GetByCondition(u => u.Status == UserStatusEnum.Pending);
        }
    }
}
