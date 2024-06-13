﻿using Common.DTO.Query;
using Common.DTO;
using DAO.Model;

namespace Repository.IRepository
{
    public interface IFeedbackRepository
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

        PagedList<Feedback> GetPagedFeedbackList(FeedbackParameters parameters);
    }
}
