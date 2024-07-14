using AutoMapper;
using Common.DTO;
using Common.DTO.Feedback;
using Common.DTO.News;
using Common.DTO.Query;
using Common.DTO.Request;
using DAO.Model;
using Firebase.Auth;
using Repository.IRepository;
using Repository.Repository;
using Service.IService;
using static Google.Apis.Requests.BatchRequest;

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

            var getFeedback = _feedbackRepository.GetFeedbackByTwoId(feedbackMap.FromId, feedbackMap.ToId);
            if (getFeedback == null)
            {
                feedbackMap = await _feedbackRepository.AddNewFeedback(feedbackMap);
                var mapperResponse = _mapper.Map<FeedbackDTO>(feedbackMap);

                if (feedbackMap != null)
                {
                    return mapperResponse;
                }
            } else
            {
                getFeedback.Description = feedbackMap.Description;
                getFeedback.FromId = feedbackMap.FromId;
                getFeedback.ToId = feedbackMap.ToId;
                getFeedback.Rating = feedbackMap.Rating;
                getFeedback = await _feedbackRepository.UpdateFeedback(getFeedback);
                var mapperResponseTwo = _mapper.Map<FeedbackDTO>(getFeedback);

                if (getFeedback != null)
                {
                    return mapperResponseTwo;
                }
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

        public PaginationResponseDTO<FeedbackDTO> GetFeedbacksOfTutor(int tutorId, FeedbackParameters parameters)
        {
            var requests = _feedbackRepository.GetPagedFeedbacksOfTutor(tutorId, parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<FeedbackDTO>>(requests);
            mappedResponse.Data = _mapper.Map<List<FeedbackDTO>>(requests);

            return mappedResponse;
        }

        public PaginationResponseDTO<FeedbackDTO> GetPagedFeedbacksList(FeedbackParameters parameters)
        {

            var requests = _feedbackRepository.GetPagedFeedbackList(parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<FeedbackDTO>>(requests);
            mappedResponse.Data = _mapper.Map<List<FeedbackDTO>>(requests);

            return mappedResponse;

        }

        public async Task<Feedback> UpdateFeedback(Feedback feedback)
        {
            return await _feedbackRepository.UpdateFeedback(feedback);
        }
    }
}
