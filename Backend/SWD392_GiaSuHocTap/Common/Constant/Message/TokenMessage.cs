namespace Common.Constant.Message
{
    public static class TokenMessage
    {
        public const string InvalidToken = "Access token is invalid";
        public const string UnExpiredToken = "Token has not expired yet";
        public const string NoExist = "Refresh token does not exists in DB";
        public const string NotMatched = "Token does not match";
        public const string ExpiredRefreshToken = "Your refresh token has expired, please re-authenticate";
        public const string IsRevoked = "Refresh token is revoked";
        public const string SuccessfullyCreated = "Create token successfully";
    }
}
