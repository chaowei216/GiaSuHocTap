using DAO.Model;
using Common.DTO;
using Common.DTO.Feedback;
using Common.DTO.Query;
using Common.DTO.Request;
using Common.DTO.News;

namespace Service.IService
{
    public interface IFeedbackService
    {
        /// <summary>
        /// Get all Feedbacks
        /// </summary>
        /// <returns></returns>
        IEnumerable<Feedback> GetAllFeedbacks();

        /// <summary>
        /// Get Feedback by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Feedback?> GetFeedbackById(int id);

        /// <summary>
        /// Add new Feedback
        /// </summary>
        /// <param name="feedback"></param>
        /// <returns></returns>
        Task<FeedbackDTO> AddNewFeedback(FeedbackCreateDTO feedback);

        /// <summary>
        /// Update Feedback
        /// </summary>
        /// <param name="feedback"></param>
        /// <returns></returns>
        Task<Feedback> UpdateFeedback(Feedback feedback);

        /// <summary>
        /// Get all feedbacks of tutor
        /// </summary>
        /// <param name="tutorId"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PaginationResponseDTO<FeedbackDTO> GetFeedbacksOfTutor(int tutorId, FeedbackParameters parameters);

        /// <summary>
        /// Get feedback list with pagination
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PaginationResponseDTO<FeedbackDTO> GetPagedFeedbacksList(FeedbackParameters parameters);
    }
}
