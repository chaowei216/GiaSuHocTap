﻿using DAO.Model;

namespace Repository.IRepository
{
    public interface IRoleRepository
    {
        /// <summary>
        /// Add new role
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        IEnumerable<Role> GetAllRoles();

        /// <summary>
        /// Get role by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Role?> GetRoleById(int id);

        /// <summary>
        /// Get role by id
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        Role? GetRoleByName(string name);

        /// <summary>
        /// Add new role
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        Task<Role> AddRole(Role role);
    }
}
