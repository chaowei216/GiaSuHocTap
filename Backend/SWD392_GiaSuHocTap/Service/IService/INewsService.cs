using DAO.Model;
using Common.DTO.News;
using Common.DTO.Query;
using Common.DTO.User;
using Common.DTO;
using Microsoft.AspNetCore.Http;

namespace Service.IService
{
    public interface INewsService
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
        Task<NewsDTO> AddNewNews(NewsCreateDTO news, IFormFile imageFile);

        /// <summary>
        /// Update News
        /// </summary>
        /// <param name="news"></param>
        /// <returns></returns>
        Task<News> UpdateNews(News news);

        /// <summary>
        /// Get news list with pagination
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        PaginationResponseDTO<NewsDTO> GetPagedNewsList(NewsParameters parameters);
    }
}
