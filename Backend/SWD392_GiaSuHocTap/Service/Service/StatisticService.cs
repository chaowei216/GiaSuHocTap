using Common.Constant.Request;
using Common.DTO.Statistic;
using Common.DTO.User;
using Common.Enum;
using DAO.Model;
using Service.IService;

namespace Service.Service
{
    public class StatisticService : IStatisticService
    {
        private readonly ITransactionService _transactionService;
        private readonly IUserService _userService;
        private readonly IRequestService _requestService;
        private readonly IFeedbackService _feedbackService;

        public StatisticService(ITransactionService transactionService,
                                 IUserService userService,
                                 IRequestService requestService,
                                 IFeedbackService feedbackService)
        {
            _userService = userService;
            _transactionService = transactionService;
            _requestService = requestService;
            _feedbackService = feedbackService;
        }

        public GeneralDataDTO GetGeneralData()
        {
            var generalData = new GeneralDataDTO();
            var users = _userService.GetAllUsers();
            generalData.TotalTutor = users.Where(p => p.RoleId == (int)RoleEnum.Tutor && p.Status == UserStatusEnum.Active).Count();
            generalData.TotalStudent = users.Where(p => p.RoleId == (int)RoleEnum.Parents && p.Status == UserStatusEnum.Active).Count();

            var feedBacks = _feedbackService.GetAllFeedbacks().Where(p => p.Rating >= 3);
            generalData.FeedbackSatisfied = feedBacks.Count();

            var requests = _requestService.GetAllRequests().Where(p => p.Status == RequestConst.CompletedStatus);
            generalData.SuccessfulLesson = requests.Count();

            return generalData;
        }

        public StatisticSystemDTO GetStatisticOfSystem()
        {
            var systemInfo = new StatisticSystemDTO();

            var users = _userService.GetAllUsers();
            systemInfo.Tutor = users.Where(p => p.RoleId == (int)RoleEnum.Tutor && p.Status == UserStatusEnum.Active).Count();
            systemInfo.Student = users.Where(p => p.RoleId == (int)RoleEnum.Parents && p.Status == UserStatusEnum.Active).Count();
            
            var transactions = _transactionService.GetAllPaidTransactions();
            systemInfo.Transaction = transactions.Count();

            systemInfo.Revenue = _requestService.GetRevenueOfRequest();

            return systemInfo;
        }

        public UserRentingInfoDTO GetUserRentingInfo(User user)
        {
            var info = new UserRentingInfoDTO();
            var trans = _transactionService.GetPaidTransOfUser(user.UserId);

            // cal total amount deposited
            info.TotalAmountDeposited = trans.Sum(p => p.Amount);

            var requests = _requestService.GetRequestsOfUser(user.UserId).Where(p => p.RequestType == RequestConst.Online);

            // cal total hired tutor
            info.TotalNumberOfTutorHiring = requests.Count();

            List<RequestTime> times = new List<RequestTime>();

            foreach (var request in requests)
            {
                foreach (var t in request.RequestTimes)
                {
                    if (t.Status == RequestConst.CompletedStatus)
                    {
                        times.Add(t);
                    }
                }
            }

            // cal total hours of hiring
            info.NumOfHoursRent = times.Count();

            return info;
        }
    }
}
