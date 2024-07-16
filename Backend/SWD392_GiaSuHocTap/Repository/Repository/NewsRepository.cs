using Common.DTO;
using Common.DTO.Query;
using DAO.DAO;
using DAO.Model;
using Microsoft.EntityFrameworkCore;
using Repository.IRepository;

namespace Repository.Repository
{
    public class NewsRepository : INewsRepository
    {
        private readonly IGenericDAO<News> _newsDAO;

        public NewsRepository(IGenericDAO<News> newsDAO)
        {
            _newsDAO = newsDAO;
        }

        public async Task<News> AddNewNews(News news)
        {
            return await _newsDAO.AddAsync(news);
        }

        public IEnumerable<News> GetAllNews()
        {
            return _newsDAO.GetAll().AsEnumerable();
        }

        public async Task<News?> GetNewsById(int id)
        {
            return await _newsDAO.GetByIdAsync(id);
        }

        public PagedList<News> GetPagedNewsList(NewsParameters parameters)
        {
            return PagedList<News>.ToPagedList(_newsDAO.GetAll().Include(p => p.User).OrderByDescending(p => p.CreateDate), parameters.PageNumber, parameters.PageSize);
        }

        public async Task<News> UpdateNews(News news)
        {
            return await _newsDAO.UpdateAsync(news);
        }
    }
}
