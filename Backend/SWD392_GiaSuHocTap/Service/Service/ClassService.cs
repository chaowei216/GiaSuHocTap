using DAO.Model;
using Repository.IRepository;
using Service.IService;

namespace Service.Service
{
    public class ClassService : IClassService
    {
        private readonly IClassRepository _classRepository;

        public ClassService(IClassRepository classRepository)
        {
            _classRepository = classRepository;
        }

        public async Task<Class> AddClass(Class entity)
        {
            return await _classRepository.AddClass(entity);
        }

        public IEnumerable<Class> GetAllClass()
        {
            return _classRepository.GetAllClass().AsEnumerable();
        }

        public async Task<Class?> GetClassById(int id)
        {
            return await _classRepository.GetClassById(id);
        }
    }
}
