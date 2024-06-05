using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DAO.DAO
{
    public class GenericDAO<T> :IGenericDAO<T> where T : class
    {
        private readonly DataContext _context;
        private readonly DbSet<T> _dbSet;

        public GenericDAO(DataContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task<T> AddAsync(T entity)
        {
            var addedEntity = await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
            return addedEntity.Entity;
        }

        public async Task<bool> DeleteAsync(T entity)
        {
            _dbSet.Remove(entity);
            return await _context.SaveChangesAsync() > 0;
        }

        public IQueryable<T> GetAll()
        {
            return _dbSet.AsQueryable();
        }

        public async Task<IList<T>> GetAllAsyncInclude(Expression<Func<T, object>>? include)
        {
            IQueryable<T> query = _dbSet;

            if (include != null)
            {
                query = query.Include(include);
            }

            return await query.ToListAsync();
        }

        public IQueryable<T> GetByCondition(Expression<Func<T, bool>> condition)
        {
            return _dbSet.Where(condition).AsQueryable();
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<T> UpdateAsync(T entity)
        {
            var updatedEntity = _dbSet.Update(entity);
            await _context.SaveChangesAsync();
            return updatedEntity.Entity;
        }
    }
}
