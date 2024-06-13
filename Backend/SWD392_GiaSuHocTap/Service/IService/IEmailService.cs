using Common.DTO.Email;

namespace Service.IService
{
    public interface IEmailService
    {
        OtpCodeDTO GenerateOTP();

        /// <summary>
        /// Send otp code
        /// </summary>
        /// <param name="userEmail"></param>
        /// <param name="userName"></param>
        /// <param name="otpCode"></param>
        void SendOTPEmail(string userEmail, string otpCode, string subject);

        /// <summary>
        /// Send welcome email
        /// </summary>
        /// <param name="userEmail"></param>
        /// <param name="userName"></param>
        /// <param name="otpCode"></param>
        /// <param name="subject"></param>
        void SendWelcomeEmail(string userEmail, string subject);
    }
}
