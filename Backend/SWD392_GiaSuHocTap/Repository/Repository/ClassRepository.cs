using Common.DTO;
using Common.DTO.Query;
using DAO.DAO;
using DAO.Model;
using Repository.IRepository;

namespace Repository.Repository
{
    public class ClassRepository : IClassRepository
    {
        private readonly IGenericDAO<Class> _classDAO;

        public ClassRepository(IGenericDAO<Class> classDAO)
        {
            _classDAO = classDAO;
        }

        public async Task<Class> AddClass(Class entity)
        {
            return await _classDAO.AddAsync(entity);
        }

        public IEnumerable<Class> GetAllClasses()
        {
            return _classDAO.GetAll().AsEnumerable();
        }

        public async Task<Class?> GetClassById(int id)
        {
            return await _classDAO.GetByIdAsync(id);
        }

        public PagedList<Class> GetPagedClassList(ClassParameters parameters)
        {
            return PagedList<Class>.ToPagedList(_classDAO.GetAll(), parameters.PageNumber, parameters.PageSize);
        }
    }
}
