using DAO.DAO;
using DAO.Model;
using Repository.IRepository;

namespace Repository.Repository
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly IGenericDAO<Feedback> _feedbackDAO;

        public FeedbackRepository(IGenericDAO<Feedback> feedbackDAO)
        {
            _feedbackDAO = feedbackDAO;
        }

        public async Task<Feedback> AddNewFeedback(Feedback feedback)
        {
            return await _feedbackDAO.AddAsync(feedback);
        }

        public IEnumerable<Feedback> GetAllFeedbacks()
        {
            return _feedbackDAO.GetAll().AsEnumerable();
        }

        public async Task<Feedback?> GetFeedbackById(int id)
        {
            return await _feedbackDAO.GetByIdAsync(id);
        }

        public async Task<Feedback> UpdateFeedback(Feedback feedback)
        {
            return await _feedbackDAO.UpdateAsync(feedback);
        }
    }
}
