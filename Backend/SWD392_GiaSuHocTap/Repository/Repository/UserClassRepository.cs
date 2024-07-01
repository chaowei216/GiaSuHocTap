using DAO.DAO;
using DAO.Model;
using Repository.IRepository;

namespace Repository.Repository
{
    public class UserClassRepository : IUserClassRepository
    {
        private readonly IGenericDAO<UserClass> _userClassDAO;

        public UserClassRepository(IGenericDAO<UserClass> userClassDAO)
        {
            _userClassDAO = userClassDAO;
        }

        public async Task<UserClass> AddNewUserClass(UserClass entity)
        {
            return await _userClassDAO.AddAsync(entity);
        }
    }
}
