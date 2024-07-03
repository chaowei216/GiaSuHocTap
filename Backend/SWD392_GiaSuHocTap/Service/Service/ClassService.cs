using AutoMapper;
using DAO.Model;
using Common.DTO.Class;
using Repository.IRepository;
using Service.IService;
using Repository.Repository;

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

        public async Task<UserClass> AddNewUserClass(UserClass entity)
        {
            return await _classRepository.AddNewUserClass(entity);
        }

        public async Task<UserClass> AddUserClass(UserClass entity)
        {
            return await _classRepository.AddNewUserClass(entity);
        }
        public async Task<bool> DeleteUserClass(int userId)
        {
            try
            {
                var userClass = _classRepository.GetUserClassByUserId(userId).ToList();
                await Task.WhenAll(userClass.Select(c => _classRepository.DeleteUserClass(c)));
                return true;
            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public IEnumerable<ClassDTO> GetAllClasses()
        {
            var classes =_classRepository.GetAllClasses().AsEnumerable();
            var classesMap = _mapper.Map<List<ClassDTO>>(classes);

            return classesMap;
        }

        public IEnumerable<DeleteUserClassDTO> GetAllUserClasses(int userId)
        {
            var userClass = _classRepository.GetUserClassByUserId(userId);
            var userClassMap = _mapper.Map<List<DeleteUserClassDTO>>(userClass);
            return userClassMap;
        }

        public async Task<Class?> GetClassById(int id)
        {
            return await _classRepository.GetClassById(id);
        }
    }
}
