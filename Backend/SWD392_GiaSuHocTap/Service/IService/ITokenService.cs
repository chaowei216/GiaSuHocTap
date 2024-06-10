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
        Task<TokenResponseDTO?> CreateJWTToken(User user, string existingRefreshToken);

        /// <summary>
        /// Generate a new access token
        /// </summary>
        /// <param name="accessToken"></param>
        /// <param name="refreshToken"></param>
        /// <returns></returns>
        Task<RefreshTokenResponseDTO> GenerateNewToken(string accessToken, string refreshToken);

        /// <summary>
        /// Verify token
        /// </summary>
        /// <param name="accessToken"></param>
        /// <param name="refreshToken"></param>
        /// <returns></returns>
        ValidatedTokenDTO CheckValidToken(string accessToken, string refreshToken);
    }
}
