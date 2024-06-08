using DAO.Model;

namespace Service.IService
{
    public interface ITokenService
    {
        /// <summary>
        /// Create JWT Token
        /// </summary>
        /// <param name="user"></param>
        /// <param name="role"></param>
        /// <returns></returns>
        string CreateJWTToken(User user, string role);
    }
}
