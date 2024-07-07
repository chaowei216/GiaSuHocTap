using Common.DTO;
using DAO.Model;
using Repository.IRepository;
using Service.IService;

namespace Service.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly IFeedbackRepository _feedbackRepository;

        public FeedbackService(IFeedbackRepository feedbackRepository)
        {
            _feedbackRepository = feedbackRepository;
        }

        public async Task<ResponseDTO> AddNewFeedback(Feedback feedback)
        {
            return null;
            //return await _feedbackRepository.AddNewFeedback(feedback);
        }

        public IEnumerable<Feedback> GetAllFeedbacks()
        {
            return _feedbackRepository.GetAllFeedbacks().AsEnumerable();
        }

        public async Task<Feedback?> GetFeedbackById(int id)
        {
            return await _feedbackRepository.GetFeedbackById(id);
        }

        public async Task<Feedback> UpdateFeedback(Feedback feedback)
        {
            return await _feedbackRepository.UpdateFeedback(feedback);
        }
    }
}
