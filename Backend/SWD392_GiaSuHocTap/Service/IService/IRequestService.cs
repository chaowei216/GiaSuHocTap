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
        /// Add new offline request
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<RequestDTO?> AddOfflineRequest(RequestOfflineCreateDTO request);

        /// <summary>
        /// Update offline request
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<RequestDTO?> UpdateOfflineRequest(RequestUpdateDTO requestInfo);
    }
}
