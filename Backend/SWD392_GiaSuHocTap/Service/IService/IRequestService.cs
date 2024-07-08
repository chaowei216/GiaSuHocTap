using Common.DTO;
using Common.DTO.Query;
using Common.DTO.Request;
using DAO.Model;

namespace Service.IService
{
    public interface IRequestService
    {
        /// <summary>
        /// Get all offline requests of tutor
        /// </summary>
        /// <param name="tutorId"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PaginationResponseDTO<RequestDTO> GetOfflineRequestsOfTutor(int tutorId, RequestParameters parameters);

        /// <summary>
        /// Get all online requests of tutor
        /// </summary>
        /// <param name="tutorId"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PaginationResponseDTO<RequestDTO> GetOnlineRequestsOfTutor(int tutorId, RequestParameters parameters);

        /// <summary>
        /// Get pending online requests of tutor
        /// </summary>
        /// <param name="tutorId"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PaginationResponseDTO<RequestDTO> GetPendingRequestsOfTutor(int tutorId, RequestParameters parameters);

        /// <summary>
        /// Get pending online requests of tutor
        /// </summary>
        /// <param name="tutorId"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PaginationResponseDTO<RequestDTO> GetInProcessRequestsOfTutor(int tutorId, RequestParameters parameters);

        /// <summary>
        /// Add new offline request
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<RequestDTO?> AddOfflineRequest(RequestOfflineCreateDTO request);

        /// <summary>
        /// Add new online request
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO?> AddOnlineRequest(RequestOnlineDTO request);

        /// <summary>
        /// Update offline request
        /// </summary>
        /// <param name="requestInfo"></param>
        /// <returns></returns>
        Task<RequestDTO?> UpdateOfflineRequest(RequestUpdateDTO requestInfo);

        /// <summary>
        /// Accept/deny request
        /// </summary>
        /// <returns></returns>
        Task<RequestDTO?> UpdateOnlineRequest(RequestUpdateDTO requestInfo);

        /// <summary>
        /// Get all requests of user
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PaginationResponseDTO<RequestDTO> GetUserRequests(int userId, RequestParameters parameters);

        /// <summary>
        /// Done request
        /// </summary>
        /// <returns></returns>
        Task<RequestDTO?> DoneOnlineRequest(DoneRequestDTO requestInfo);

        /// <summary>
        /// Extend request
        /// </summary>
        /// <returns></returns>
        Task<RequestDTO?> ExtendOnlineRequest(DoneRequestDTO requestInfo);
    }
}
