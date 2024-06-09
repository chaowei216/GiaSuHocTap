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
    }
}
