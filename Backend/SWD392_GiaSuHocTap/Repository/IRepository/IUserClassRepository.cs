using DAO.Model;

namespace Repository.IRepository
{
    public interface IUserClassRepository
    {
        /// <summary>
        /// Add new user class
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        Task<UserClass> AddNewUserClass(UserClass entity);
    }
}
