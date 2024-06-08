using Common.DTO.Auth;
using DAO.Model;

namespace Service.IService
{
    public interface IAuthService
    {
        /// <summary>
        /// Login
        /// </summary>
        /// <param name="loginRequest"></param>
        /// <returns></returns>
        Task<User> Login(LoginRequestDTO loginRequest);
    }
}
