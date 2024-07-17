using Common.Constant.Request;
using Common.DTO;
using Common.DTO.Query;
using Common.DTO.Report;
using Common.Enum;
using DAO.DAO;
using DAO.Model;
using Microsoft.EntityFrameworkCore;
using Repository.IRepository;

namespace Repository.Repository
{
    public class RequestRepository : IRequestRepository
    {
        private readonly IGenericDAO<Request> _requestDAO;
        private readonly IGenericDAO<RequestTime> _requestTimeDAO;

        public RequestRepository(IGenericDAO<Request> requestDAO,
                                 IGenericDAO<RequestTime> requestTimeDAO)
        {
            _requestDAO = requestDAO;
            _requestTimeDAO = requestTimeDAO;
        }

        public async Task<Request> AddNewRequest(Request request)
        {
            return await _requestDAO.AddAsync(request);
        }

        public async Task<RequestTime> AddNewRequestTime(RequestTime requestTime)
        {
            return await _requestTimeDAO.AddAsync(requestTime);
        }

        public IEnumerable<Request> GetAllRequestOfUser(int userId)
        {
            return _requestDAO.GetByCondition(p => p.FromId == userId).Include(p => p.From).Include(p => p.RequestTimes).ToList();
        }

        public IEnumerable<Request> GetAllRequests()
        {
            return _requestDAO.GetAll();
        }

        public IEnumerable<RequestTime> GetAllTimeOfRequest(int requestId)
        {
            return _requestTimeDAO.GetByCondition(p => p.RequestId == requestId).ToList();
        }

        public PagedList<Request> GetPagedInProcessOnlineRequestsOfParents(int parentsId, RequestParameters parameters)
        {
            var requestIdsOfTutor = _requestDAO.GetAll().Include(t => t.RequestTimes).ThenInclude(t => t.TimeTable).Where(p => p.FromId == parentsId).Select(p => p.RequestId).ToList();

            return PagedList<Request>.ToPagedList(_requestDAO.GetAll().Where(p => requestIdsOfTutor.Contains(p.RequestId) && p.RequestType == RequestConst.Online && p.Status == RequestConst.InProcessStatus).Include(p => p.Course).Include(p => p.Class).Include(p => p.From).Include(p => p.RequestTimes).ThenInclude(p => p.TimeTable).OrderByDescending(p => p.CreatedDate), parameters.PageNumber, parameters.PageSize);
        }

        public PagedList<Request> GetPagedInProcessOnlineRequestsOfTutor(int tutorId, RequestParameters parameters)
        {
            var requestIdsOfTutor = _requestTimeDAO.GetAll().Include(p => p.TimeTable).Where(p => p.TimeTable.UserId == tutorId).Select(p => p.RequestId).ToList();

            return PagedList<Request>.ToPagedList(_requestDAO.GetAll().Where(p => requestIdsOfTutor.Contains(p.RequestId) && p.RequestType == RequestConst.Online && p.Status == RequestConst.InProcessStatus).Include(p => p.Course).Include(p => p.Class).Include(p => p.From).Include(p => p.RequestTimes).ThenInclude(p => p.TimeTable).OrderByDescending(p => p.CreatedDate), parameters.PageNumber, parameters.PageSize);
        }

        public PagedList<Request> GetPagedOfflineRequestsOfTutor(int tutorId, RequestParameters parameters)
        {
            var requestIdsOfTutor = _requestTimeDAO.GetAll().Include(p => p.TimeTable).Where(p => p.TimeTable.UserId == tutorId).Select(p => p.RequestId).ToList();

            return PagedList<Request>.ToPagedList(_requestDAO.GetAll().Where(p => requestIdsOfTutor.Contains(p.RequestId) && p.RequestType == RequestConst.Offline).Include(p => p.Course).Include(p => p.Class).Include(p => p.From).Include(p => p.RequestTimes).ThenInclude(p => p.TimeTable), parameters.PageNumber, parameters.PageSize);
        }

        public PagedList<Request> GetPagedOnlineRequestsOfTutor(int tutorId, RequestParameters parameters)
        {
            var requestIdsOfTutor = _requestTimeDAO.GetAll().Include(p => p.TimeTable).Where(p => p.TimeTable.UserId == tutorId).Select(p => p.RequestId).ToList();

            return PagedList<Request>.ToPagedList(_requestDAO.GetAll().Where(p => requestIdsOfTutor.Contains(p.RequestId) && p.RequestType == RequestConst.Online).Include(p => p.Course).Include(p => p.Class).Include(p => p.From).Include(p => p.RequestTimes).ThenInclude(p => p.TimeTable), parameters.PageNumber, parameters.PageSize);
        }

        public PagedList<Request> GetPagedPendingOnlineRequestsOfParents(int parentsId, RequestParameters parameters)
        {
            var requestIdsOfTutor = _requestDAO.GetAll().Include(t => t.RequestTimes).ThenInclude(t => t.TimeTable).Where(p => p.FromId == parentsId).Select(p => p.RequestId).ToList();

            return PagedList<Request>.ToPagedList(_requestDAO.GetAll().Where(p => requestIdsOfTutor.Contains(p.RequestId) && p.RequestType == RequestConst.Online && p.Status == RequestConst.PendingStatus).Include(p => p.Course).Include(p => p.Class).Include(p => p.From).Include(p => p.RequestTimes).ThenInclude(p => p.TimeTable), parameters.PageNumber, parameters.PageSize);

        }

        public PagedList<Request> GetPagedPendingOnlineRequestsOfTutor(int tutorId, RequestParameters parameters)
        {
            var requestIdsOfTutor = _requestTimeDAO.GetAll().Include(p => p.TimeTable).Where(p => p.TimeTable.UserId == tutorId).Select(p => p.RequestId).ToList();

            return PagedList<Request>.ToPagedList(_requestDAO.GetAll().Where(p => requestIdsOfTutor.Contains(p.RequestId) && p.RequestType == RequestConst.Online && p.Status == RequestConst.PendingStatus).Include(p => p.Course).Include(p => p.Class).Include(p => p.From).Include(p => p.RequestTimes).ThenInclude(p => p.TimeTable), parameters.PageNumber, parameters.PageSize);
        }

        public async Task<RequestTime> GetPendingRequestTimeByRequestId(int requestId)
        {
            return await _requestTimeDAO.GetByCondition(t => t.RequestId == requestId && t.Status == RequestConst.PendingStatus).FirstOrDefaultAsync();
        }

        public async Task<Request?> GetRequestById(int id)
        {
            return await _requestDAO.GetByIdAsync(id);
        }

        public double GetRevenueOfRequest()
        {
            int? onlineReqCoin = _requestDAO.GetAll().Where(p => p.RequestType == RequestConst.Online && p.Status == RequestConst.CompletedStatus).Sum(p => p.Coin);
            double onlRevenue = onlineReqCoin == null | onlineReqCoin == 0 ? 0 : (double)onlineReqCoin! * 0.3 * 1000;

            double offReqRevenue =  _requestDAO.GetAll().Where(p => p.RequestType == RequestConst.Offline && p.Status == RequestConst.CompletedStatus).Count() * 10000;

            var total = onlRevenue + offReqRevenue;

            return total;
        }

        public PagedList<Request> GetUserRequest(int userId, RequestParameters parameters)
        {
            var request = _requestDAO.GetAll();

            if (!string.IsNullOrEmpty(parameters.RequestType))
            {
                request = request.Where(p => p.RequestType.ToLower() == parameters.RequestType.ToLower());
            }

            if (!string.IsNullOrEmpty(parameters.Status))
            {
                request = request.Where(p => p.Status.ToLower() == parameters.Status.ToLower());
            }

            return PagedList<Request>.ToPagedList(request.Include(p => p.Class).Include(p => p.Course).Include(p => p.From).Include(p => p.RequestTimes).ThenInclude(p => p.TimeTable).ThenInclude(p => p.User).Where(t => t.FromId == userId || t.RequestTimes.Where(t => t.TimeTable.UserId == userId).Any()).OrderByDescending(p => p.CreatedDate), parameters.PageNumber, parameters.PageSize);
        }

        public async Task<Request> UpdateRequest(Request request)
        {
            return await _requestDAO.UpdateAsync(request);
        }

        public async Task<RequestTime> UpdateRequestTime(RequestTime requestTime)
        {
            return await _requestTimeDAO.UpdateAsync(requestTime);
        }
    }
}
