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
    }
}
