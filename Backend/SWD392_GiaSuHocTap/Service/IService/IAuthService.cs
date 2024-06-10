using Common.DTO;
using Common.DTO.Auth;
using Common.DTO.Email;

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
        bool CheckUserVerifiedStatus(string email);
        bool CheckOTPExpired(string email);
        bool SetOtp(OtpCodeDTO otpDto, string email);
        bool CheckOTP(string email, string otpCode);
    }
}
