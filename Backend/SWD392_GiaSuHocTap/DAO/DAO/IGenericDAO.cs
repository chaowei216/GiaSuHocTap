using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DAO.DAO
{
    public interface IGenericDAO<T> where T : class
    {
        Task<T> GetByIdAsync(int id);
        IQueryable<T> GetByCondition(Expression<Func<T, bool>> condition);
        IQueryable<T> GetAll();
        Task<T> AddAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task<bool> DeleteAsync(T entity);
        Task<IList<T>> GetAllAsyncInclude(Expression<Func<T, object>> include = null);

    }
}
