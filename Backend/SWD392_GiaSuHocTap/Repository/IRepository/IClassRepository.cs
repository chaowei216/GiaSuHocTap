using Common.DTO.Query;
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
    }
}
