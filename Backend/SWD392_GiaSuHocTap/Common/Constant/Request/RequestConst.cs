namespace Common.Constant.Request
{
    public static class RequestConst
    {
        // status
        public const string PendingStatus = "Chờ xác nhận";
        public const string InProcessStatus = "Đang tiến hành";
        public const string CompletedStatus = "Hoàn thành";
        public const string CancelledStatus = "Từ chối";
        public const string AcceptedStatus = "Đã chấp nhận";

        // Description (online)
        public const string OnlineDescription = "Thuê gia sư trực tuyến";

        // request type
        public const string Online = "Online";
        public const string Offline = "Offline";
        
    }
}
