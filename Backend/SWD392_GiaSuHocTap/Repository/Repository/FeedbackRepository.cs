using Common.Constant.Request;
using Common.DTO;
using Common.DTO.Query;
using Common.DTO.Request;
using DAO.DAO;
using DAO.Model;
using Microsoft.EntityFrameworkCore;
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

        public Feedback? GetFeedbackByTwoId(int fromId, int toId)
        {
            return _feedbackDAO.GetAll().Where(d => d.ToId == toId && d.FromId == fromId).FirstOrDefault();
        }

        public PagedList<Feedback> GetPagedFeedbackList(FeedbackParameters parameters)
        {
            return PagedList<Feedback>.ToPagedList(_feedbackDAO.GetAll().Include(d => d.From).Include(d => d.To), parameters.PageNumber, parameters.PageSize);
        }

        public PagedList<Feedback> GetPagedFeedbacksOfTutor(int tutorId, FeedbackParameters parameters)
        {

            return PagedList<Feedback>.ToPagedList(_feedbackDAO.GetAll().Include(d => d.From).Include(d => d.To).Where(p => p.ToId == tutorId), parameters.PageNumber, parameters.PageSize);
        }

        public async Task<Feedback> UpdateFeedback(Feedback feedback)
        {
            return await _feedbackDAO.UpdateAsync(feedback);
        }
    }
}
