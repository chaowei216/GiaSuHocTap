using Common.DTO.Feedback;
using DAO.Model;
using Repository.IRepository;
using Repository.Repository;
using Service.IService;
using Common.DTO.News;
using AutoMapper;
using Common.DTO;
using Common.DTO.Query;

namespace Service.Service
{
    public class NewsService : INewsService
    {
        private readonly INewsRepository _newsRepository;
        private readonly IMapper _mapper;

        public NewsService(INewsRepository newsRepository, IMapper mapper)
        {
            _newsRepository = newsRepository;
            _mapper = mapper;
        }

        public async Task<NewsDTO> AddNewNews(NewsCreateDTO news)
        {
            var newsMap = _mapper.Map<News>(news);
            newsMap.Status = true;
            var response = await _newsRepository.AddNewNews(newsMap);
            var mapperResponse = _mapper.Map<NewsDTO>(response);
            if (response != null)
            {
                return mapperResponse;
            }
            return null;
        }

        public IEnumerable<News> GetAllNews()
        {
            return _newsRepository.GetAllNews().AsEnumerable();
        }

        public async Task<News?> GetNewsById(int id)
        {
            return await _newsRepository.GetNewsById(id);
        }

        public PaginationResponseDTO<NewsDTO> GetPagedNewsList(NewsParameters parameters)
        {
            var requests = _newsRepository.GetPagedNewsList(parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<NewsDTO>>(requests);
            mappedResponse.Data = _mapper.Map<List<NewsDTO>>(requests);

            return mappedResponse;
        }

        public async Task<News> UpdateNews(News news)
        {
            return await _newsRepository.UpdateNews(news);
        }
    }
}
