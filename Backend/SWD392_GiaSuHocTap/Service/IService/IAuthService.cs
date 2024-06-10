using Common.DTO.Auth;

namespace Service.IService
{
    public interface IAuthService
    {
        /// <summary>
        /// Login
        /// </summary>
        /// <param name="loginRequest"></param>
        /// <returns></returns>
        Task<LoginResponseDTO?> Login(LoginRequestDTO loginRequest);

        /// <summary>
        /// Logout
        /// </summary>
        /// <param name="accessToken"></param>
        /// <param name="refreshToken"></param>
        /// <returns></returns>
        Task<LogoutResponseDTO> LogOut(string accessToken, string refreshToken);
    }
}
