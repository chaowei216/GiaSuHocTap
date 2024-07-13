using DAO.Model;
using Common.DTO.Class;

namespace Service.IService
{
    public interface IClassService
    {
        /// <summary>
        /// Get all classes
        /// </summary>
        /// <returns></returns>
        IEnumerable<ClassFullDTO> GetAllClasses();

        /// <summary>
        /// Get class by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Class?> GetClassById(int id);

        /// <summary>
        /// Add new class
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        Task<Class> AddClass(Class entity);
        
        /// <summary>
        /// Delete User Class
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<bool> DeleteUserClass(int userId);

        /// <summary>
        /// Get all user classes
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        IEnumerable<DeleteUserClassDTO> GetAllUserClasses(int userId);

        /// <summary>
        /// Add new user class
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        Task<UserClass> AddNewUserClass(UserClass entity);

        /// <summary>
        /// Get user classes by user Id and classId
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="classId"></param>
        /// <returns></returns>
        Task<UserClass?> GetUserClassByUserIdAndClassId(int userId, int classId);
    }
}
