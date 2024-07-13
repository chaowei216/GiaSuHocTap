using Common.DTO;
using Common.DTO.Query;
using DAO.DAO;
using DAO.Model;
using Microsoft.EntityFrameworkCore;
using Repository.IRepository;

namespace Repository.Repository
{
    public class ClassRepository : IClassRepository
    {
        private readonly IGenericDAO<Class> _classDAO;
        private readonly IGenericDAO<UserClass> _userClassDAO;

        public ClassRepository(IGenericDAO<Class> classDAO, IGenericDAO<UserClass> userClassDAO)
        {
            _classDAO = classDAO;
            _userClassDAO = userClassDAO;
        }

        public async Task<Class> AddClass(Class entity)
        {
            return await _classDAO.AddAsync(entity);
        }

        public async Task<UserClass> AddNewUserClass(UserClass entity)
        {
            return await _userClassDAO.AddAsync(entity);
        }

        public async Task<bool> DeleteUserClass(UserClass userClass)
        {

            return await _userClassDAO.DeleteAsync(userClass);

        }

        public IEnumerable<Class> GetAllClasses()
        {
            return _classDAO.GetAll().AsEnumerable();
        }

        public async Task<Class?> GetClassById(int id)
        {
            return await _classDAO.GetAll().FirstOrDefaultAsync(c => c.ClassId == id);
        }

        public PagedList<Class> GetPagedClassList(ClassParameters parameters)
        {
            return PagedList<Class>.ToPagedList(_classDAO.GetAll(), parameters.PageNumber, parameters.PageSize);
        }

        public IEnumerable<UserClass> GetUserClassByUserId(int userId)
        {
            return _userClassDAO.GetAll().Where(d => d.UserId == userId).AsEnumerable();
        }

        public async Task<UserClass?> GetUserClassByUserIdAndClassId(int userId, int classId)
        {
            return await _userClassDAO.GetAll().Where(d => d.UserId == userId && d.ClassId == classId).FirstOrDefaultAsync();
        }
    }
}
