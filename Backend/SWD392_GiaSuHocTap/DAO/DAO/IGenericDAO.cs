using System.Linq.Expressions;

namespace DAO.DAO
{
    public interface IGenericDAO<T> where T : class
    {
        /// <summary>
        /// Get record by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<T?> GetByIdAsync(int id);

        /// <summary>
        /// Get records by condition
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        IQueryable<T> GetByCondition(Expression<Func<T, bool>> condition);

        /// <summary>
        /// Get all records
        /// </summary>
        /// <returns></returns>
        IQueryable<T> GetAll();

        /// <summary>
        /// Add new record
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        Task<T> AddAsync(T entity);

        /// <summary>
        /// Update record
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        Task<T> UpdateAsync(T entity);

        /// <summary>
        /// Delete record
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        Task<bool> DeleteAsync(T entity);
        
        /// <summary>
        /// Get all records with include method
        /// </summary>
        /// <param name="include"></param>
        /// <returns></returns>
        Task<IList<T>> GetAllAsyncInclude(Expression<Func<T, object>>? include);

    }
}
