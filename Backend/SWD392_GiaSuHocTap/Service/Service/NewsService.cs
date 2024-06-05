using DAO.Model;
using Repository.IRepository;
using Service.IService;

namespace Service.Service
{
    public class NewsService : INewsService
    {
        private readonly INewsRepository _newsRepository;

        public NewsService(INewsRepository newsRepository)
        {
            _newsRepository = newsRepository;
        }

        public async Task<News> AddNewNews(News news)
        {
            return await _newsRepository.AddNewNews(news);
        }

        public IEnumerable<News> GetAllNewss()
        {
            return _newsRepository.GetAllNewss().AsEnumerable();
        }

        public async Task<News?> GetNewsById(int id)
        {
            return await _newsRepository.GetNewsById(id);
        }

        public async Task<News> UpdateNews(News news)
        {
            return await _newsRepository.UpdateNews(news);
        }
    }
}
