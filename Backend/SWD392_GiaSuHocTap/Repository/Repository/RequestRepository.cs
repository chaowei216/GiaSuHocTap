using Common.Constant.Request;
using Common.DTO;
using Common.DTO.Query;
using Common.DTO.Report;
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

        public IEnumerable<Request> GetAllRequests()
        {
            return _requestDAO.GetAll();
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
    }
}
