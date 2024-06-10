using DAO.DAO;
using DAO.Model;
using Repository.IRepository;

namespace Repository.Repository
{
    public class RoleRepository : IRoleRepository
    {
        private readonly IGenericDAO<Role> _roleDAO;

        public RoleRepository(IGenericDAO<Role> roleDAO)
        {
            _roleDAO = roleDAO;
        }

        public async Task<Role> AddRole(Role role)
        {
            return await _roleDAO.AddAsync(role);
        }

        public IEnumerable<Role> GetAllRoles()
        {
            return _roleDAO.GetAll().AsEnumerable();
        }

        public async Task<Role?> GetRoleById(int id)
        {
            return await _roleDAO.GetByIdAsync(id);
        }

        public Role? GetRoleByName(string name)
        {
            return _roleDAO.GetByCondition(x => x.RoleName.ToString() == name).FirstOrDefault();
        }
    }
}
