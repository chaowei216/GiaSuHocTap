namespace Common.Constant.Message
{
    public static class AuthMessage
    {
        public const string LoginFailed = "Invalid email or password";

        public const string LoginSuccess = "Login Successfully";

        public const string WrongLoginRequest = "Please enter valid field value";

        public const string LogoutSuccess = "Logout Successfully";

        public const string LogoutFail = "Fail to logout this account";
        
        public const string UserNotFound = "User not match in the system";

        public const string UserIsNotVerified = "User is not verified";

        public const string OtpIsExpired = "Your otp is expired. Please send another!";

        public const string OtpNotMatch = "Your otp does not match!";

        public const string VerifySuccess = "Verify successfully!";

        public const string Accepted = "Accept success";

        public const string Rejected = "Reject tutor";
        public const string Banned = "Your account is banned";
    }
}
