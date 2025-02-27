﻿using Common.DTO.Query;
using Common.DTO;
using DAO.Model;

namespace Repository.IRepository
{
    public interface IClassRepository
    {
        /// <summary>
        /// Get all time tables
        /// </summary>
        /// <returns></returns>
        IEnumerable<Class> GetAllClasses();

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

        /// <summary>
        /// Get class list with pagination
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PagedList<Class> GetPagedClassList(ClassParameters parameters);

        /// <summary>
        /// Delete tutor's class
        /// </summary>
        /// <param name="userClass"></param>
        /// <returns></returns>
        Task<bool> DeleteUserClass(UserClass userClass);
        /// <summary>
        /// Add new user class
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        Task<UserClass> AddNewUserClass(UserClass entity);

        /// <summary>
        /// Get all user classes by user Id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        IEnumerable<UserClass> GetUserClassByUserId(int userId);

        /// <summary>
        /// Get user classes by user Id and classId
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="classId"></param>
        /// <returns></returns>
        Task<UserClass?> GetUserClassByUserIdAndClassId(int userId, int classId);
    }
}
