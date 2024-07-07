using AutoMapper;
using Common.DTO;
using Common.DTO.Feedback;
using DAO.Model;
using Repository.IRepository;
using Service.IService;

namespace Service.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly IFeedbackRepository _feedbackRepository;
        private readonly IMapper _mapper;

        public FeedbackService(IFeedbackRepository feedbackRepository, IMapper mapper)
        {
            _feedbackRepository = feedbackRepository;
            _mapper = mapper;
        }

        public async Task<FeedbackDTO> AddNewFeedback(FeedbackCreateDTO feedback)
        {
            var feedbackMap = _mapper.Map<Feedback>(feedback);
            var response = await _feedbackRepository.AddNewFeedback(feedbackMap);
            var mapperResponse = _mapper.Map<FeedbackDTO>(response);
            if(response != null)
            {
                return mapperResponse;
            }
            return null;
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
