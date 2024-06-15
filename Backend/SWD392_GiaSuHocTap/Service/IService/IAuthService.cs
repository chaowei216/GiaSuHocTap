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
        Task<ResponseDTO> ResetPassword(ForgotPasswordDTO model);

        /// <summary>
        /// Send code to reset password
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        Task<ResponseDTO> ForgotPassword(string email);

        /// <summary>
        /// Check user is verify?
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        bool CheckUserVerifiedStatus(string email);

        /// <summary>
        /// Check user's otp is expired?
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        bool CheckOTPExpired(string email);

        /// <summary>
        /// Set otp to db
        /// </summary>
        /// <param name="email"></param>
        /// <param name="otpDto"></param>
        /// <returns></returns>
        bool SetOtp(OtpCodeDTO otpDto, string email);

        /// <summary>
        /// Check otp code
        /// </summary>
        /// <param name="email"></param>
        /// <param name="otpCode"></param>
        /// <returns></returns>
        bool CheckOTP(string email, string otpCode);

        /// <summary>
        /// Verify email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        bool VerifyEmail(string email);

        /// <summary>
        /// Send verify email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        void SendEmailVerify(string email);

        /// <summary>
        /// Accept tutor
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        bool AcceptUser(string email);

        /// <summary>
        /// Accept tutor
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        bool RejectTutor(string email, string reason);
    }
}
