﻿using DAO.Model;

namespace Repository.IRepository
{
    public interface IClassRepository
    {
        /// <summary>
        /// Get all time tables
        /// </summary>
        /// <returns></returns>
        IEnumerable<Class> GetAllClass();

        /// <summary>
        /// Get time table by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Class?> GetClassById(int id);

        /// <summary>
        /// Add new role
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        Task<Class> AddClass(Class entity);
    }
}