using DAO.Model;

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
        Task<Feedback> AddNewFeedback(Feedback feedback);

        /// <summary>
        /// Update Feedback
        /// </summary>
        /// <param name="feedback"></param>
        /// <returns></returns>
        Task<Feedback> UpdateFeedback(Feedback feedback);
    }
}
