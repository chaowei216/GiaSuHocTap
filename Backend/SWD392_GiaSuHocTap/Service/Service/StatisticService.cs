using Common.Constant.Request;
using Common.DTO.User;
using DAO.Model;
using Service.IService;

namespace Service.Service
{
    public class StatisticService : IStatisticService
    {
        private readonly ITransactionService _transactionService;
        private readonly IUserService _userService;
        private readonly IRequestService _requestService;

        public StatisticService(ITransactionService transactionService,
                                 IUserService userService,
                                 IRequestService requestService)
        {
            _userService = userService;
            _transactionService = transactionService;
            _requestService = requestService;
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
