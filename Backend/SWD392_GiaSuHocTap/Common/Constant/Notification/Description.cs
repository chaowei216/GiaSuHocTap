namespace Common.Constant.Notification
{
    public static class Description
    {
        // register
        public const string UpdateTutorDetailSuccess = "Chúc mừng bạn đã thành công đăng ký làm giáo viên của hệ thống!";

        // payment
        public const string BuyCoinPending = "Giao dịch đang chờ thanh toán";
        public const string BuyCoinSuccess = "Giao dịch mua xu thành công";
        public const string BuyCoinFail = "Giao dịch mua xu thất bại";

        // request
        public const string CreateRequest = "Yêu cầu của bạn đã được gửi, vui lòng đợi duyệt";
        public const string ReceiveRequest = "Bạn có 1 yêu cầu thuê mới, vui lòng kiểm tra";
        public const string DeniedRequest = "Giáo viên đã từ chối yêu cầu của bạn, vui lòng thử lại sau";
        public const string AcceptedRequest = "Giáo viên đã chập nhận yêu cầu, hy vọng bạn có trải nghiệm tốt";
        public const string OfflineCompletedRequest = "Quá trình dạy và học offline đã hoàn thành";
        public const string OfflineAcceptedChecking = "Vui lòng kiểm tra email để biết thêm thông tin về phụ huynh";

        // report 
        public const string ReportSuccess = "Cảm ơn vì bài báo cáo của bạn, chúng tôi sẽ xử lý trường hợp này";
        public const string ReportFail = "Bài báo cáo chưa được xác thực, chúng tôi xin từ chối";
        public const string TutorWarning1 = "Cảnh báo vi phạm lần 1, vui lòng không tái phạm";
        public const string TutorWarning2 = "Cảnh báo vi phạm lần 2, nếu tái phạm chúng tôi sẽ khoá tài khoản";
        public const string TutorBanning = "Tài khoản đã bị khoá, vui lòng liên hệ để mở khoá";
    }
}
