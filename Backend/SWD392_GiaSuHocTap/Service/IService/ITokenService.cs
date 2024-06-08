using Common.DTO.Auth;
using DAO.Model;

namespace Service.IService
{
    public interface ITokenService
    {
        /// <summary>
        /// Crete JWT Token
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task<TokenResponseDTO?> CreateJWTToken(User user);
    }
}
