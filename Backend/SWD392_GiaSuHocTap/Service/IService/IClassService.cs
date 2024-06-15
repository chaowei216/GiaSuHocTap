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
        IEnumerable<ClassDTO> GetAllClasses();

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
    }
}
