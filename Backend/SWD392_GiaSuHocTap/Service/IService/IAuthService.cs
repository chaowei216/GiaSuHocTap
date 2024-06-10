using Common.DTO;
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
        Task<LogoutResponseDTO> LogOut(string refreshToken);

        /// <summary>
        /// Check validate input forgot password
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ResponseDTO CheckValidationForgotPassword(ForgotPasswordDTO model);


        /// <summary>
        /// Reset password
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ForgotPasswordResponseDTO ResetPassword(ForgotPasswordDTO model);

        /// <summary>
        /// Send code to reset password
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        ResponseDTO ForgotPassword(string email);
    }
}
