using DAO.Model;

namespace Repository.IRepository
{
    public interface INewsRepository
    {
        /// <summary>
        /// Get all Newss
        /// </summary>
        /// <returns></returns>
        IEnumerable<News> GetAllNews();

        /// <summary>
        /// Get News by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<News?> GetNewsById(int id);

        /// <summary>
        /// Add new News
        /// </summary>
        /// <param name="news"></param>
        /// <returns></returns>
        Task<News> AddNewNews(News news);

        /// <summary>
        /// Update News
        /// </summary>
        /// <param name="news"></param>
        /// <returns></returns>
        Task<News> UpdateNews(News news);
    }
}
