using Common.DTO.Query;
using Common.DTO;
using DAO.Model;

namespace Repository.IRepository
{
    public interface IRequestRepository
    {
        /// <summary>
        /// get all requests
        /// </summary>
        /// <returns></returns>
        IEnumerable<Request> GetAllRequests();

        /// <summary>
        /// Add new request
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<Request> AddNewRequest(Request request);

        /// <summary>
        /// Add new request time
        /// </summary>
        /// <param name="requestTime"></param>
        /// <returns></returns>
        Task<RequestTime> AddNewRequestTime(RequestTime requestTime);

        /// <summary>
        /// Get pending request time
        /// </summary>
        /// <param name="requestTime"></param>
        /// <returns></returns>
        Task<RequestTime> GetPendingRequestTimeByRequestId(int requestId);

        /// <summary>
        /// Get all offline requests of tutor
        /// </summary>
        /// <param name="tutorId"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PagedList<Request> GetPagedOfflineRequestsOfTutor(int tutorId, RequestParameters parameters);

        /// <summary>
        /// Get all online requests of tutor
        /// </summary>
        /// <param name="tutorId"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PagedList<Request> GetPagedOnlineRequestsOfTutor(int tutorId, RequestParameters parameters);

        /// <summary>
        /// Get pending online requests of parents
        /// </summary>
        /// <param name="tutorId"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PagedList<Request> GetPagedPendingOnlineRequestsOfTutor(int tutorId, RequestParameters parameters);

        /// <summary>
        /// Get pending online requests of parents
        /// </summary>
        /// <param name="tutorId"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PagedList<Request> GetPagedInProcessOnlineRequestsOfParents(int parentsId, RequestParameters parameters);

        /// <summary>
        /// Get pending online requests of parents
        /// </summary>
        /// <param name="tutorId"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PagedList<Request> GetPagedPendingOnlineRequestsOfParents(int parentsId, RequestParameters parameters);

        /// <summary>
        /// Get pending online requests of tutor
        /// </summary>
        /// <param name="tutorId"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PagedList<Request> GetPagedInProcessOnlineRequestsOfTutor(int tutorId, RequestParameters parameters);

        /// <summary>
        /// Get request by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Request?> GetRequestById(int id);

        /// <summary>
        /// Get all request time of request
        /// </summary>
        /// <param name="requestId"></param>
        /// <returns></returns>
        IEnumerable<RequestTime> GetAllTimeOfRequest(int requestId);

        /// <summary>
        /// Update request time
        /// </summary>
        /// <param name="requestTime"></param>
        /// <returns></returns>
        Task<RequestTime> UpdateRequestTime(RequestTime requestTime);

        /// <summary>
        /// Update request
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<Request> UpdateRequest(Request request);

        /// <summary>
        /// Get all request of user
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PagedList<Request> GetUserRequest(int userId, RequestParameters parameters);

        /// <summary>
        /// Get all requests of user by id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        IEnumerable<Request> GetAllRequestOfUser(int userId);

        /// <summary>
        /// Get revenue getting from request
        /// </summary>
        /// <returns></returns>
        double GetRevenueOfRequest();
    }
}
