using AutoMapper;
using DAO.Model;
using Common.DTO.Class;
using Repository.IRepository;
using Service.IService;

namespace Service.Service
{
    public class ClassService : IClassService
    {
        private readonly IClassRepository _classRepository;
        private readonly IMapper _mapper;

        public ClassService(IClassRepository classRepository, IMapper mapper)
        {
            _classRepository = classRepository;
            _mapper = mapper;
        }

        public async Task<Class> AddClass(Class entity)
        {
            return await _classRepository.AddClass(entity);
        }

        public IEnumerable<ClassDTO> GetAllClasses()
        {
            var classes =_classRepository.GetAllClasses().AsEnumerable();
            var classesMap = _mapper.Map<List<ClassDTO>>(classes);

            return classesMap;
        }

        public async Task<Class?> GetClassById(int id)
        {
            return await _classRepository.GetClassById(id);
        }
    }
}
