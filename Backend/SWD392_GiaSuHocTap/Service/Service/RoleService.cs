using DAO.Model;
using Repository.IRepository;
using Service.IService;

namespace Service.Service
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;

        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<Role> AddNewRole(Role role)
        {
            return await _roleRepository.AddRole(role);
        }

        public async Task<Role?> GetRoleById(int id)
        {
            return await _roleRepository.GetRoleById(id);
        }

        public IEnumerable<Role> GetRoles()
        {
            return _roleRepository.GetAllRoles();
        }
    }
}
