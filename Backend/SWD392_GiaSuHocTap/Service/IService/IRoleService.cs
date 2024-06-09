using DAO.Model;

namespace Service.IService
{
    public interface IRoleService
    {
        /// <summary>
        /// Get all roles
        /// </summary>
        /// <returns></returns>
        IEnumerable<Role> GetRoles();

        /// <summary>
        /// Get role by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Role?> GetRoleById(int id);

        /// <summary>
        /// Add new role
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        Task<Role> AddNewRole(Role role);
    }
}
